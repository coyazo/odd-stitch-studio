import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response("Missing Stripe webhook configuration.", {
      status: 400,
    });
  }

  let event;

  try {
    const body = await request.text();

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Stripe webhook signature error:", error);

    return new Response("Invalid webhook signature.", {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const databaseUrl =
        process.env.DATABASE_URL ||
        process.env.STORAGE_URL;

      if (!databaseUrl) {
        throw new Error("Database connection URL is missing.");
      }

      const sql = neon(databaseUrl);

      const session = event.data.object;

      const lineItems =
        await stripe.checkout.sessions.listLineItems(
          session.id,
          {
            expand: ["data.price.product"],
          }
        );

      for (const lineItem of lineItems.data) {
        const product = lineItem.price?.product;

        const productId =
          typeof product === "object"
            ? product.metadata?.product_id
            : null;

        const purchasedQuantity = lineItem.quantity || 1;

        if (!productId) {
          console.error(
            "Stripe product missing OSS product_id metadata."
          );
          continue;
        }

        const result = await sql`
          UPDATE inventory
          SET
            quantity = quantity - ${purchasedQuantity},
            updated_at = NOW()
          WHERE
            product_id = ${productId}
            AND active = TRUE
            AND quantity >= ${purchasedQuantity}
          RETURNING product_id, quantity
        `;

        if (result.length === 0) {
          console.error(
            `Inventory could not be reduced for ${productId}.`
          );
        }
      }
    } catch (error) {
      console.error("Inventory webhook error:", error);

      return new Response("Webhook processing failed.", {
        status: 500,
      });
    }
  }

  return new Response("Received", {
    status: 200,
  });
}