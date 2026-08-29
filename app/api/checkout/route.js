import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const cart = body.cart;

    if (!Array.isArray(cart) || cart.length === 0) {
      return Response.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    const databaseUrl =
      process.env.DATABASE_URL ||
      process.env.STORAGE_URL;

    if (!databaseUrl) {
      throw new Error("Database connection URL is missing.");
    }

    const sql = neon(databaseUrl);

    const lineItems = [];

    for (const item of cart) {
      const rows = await sql`
        SELECT
          product_id,
          title,
          quantity,
          price_cents,
          active
        FROM inventory
        WHERE product_id = ${item.id}
        LIMIT 1
      `;

      const product = rows[0];

      if (!product) {
        throw new Error(`Invalid product ID: ${item.id}`);
      }

      if (!product.active) {
        throw new Error(`${product.title} is not currently available.`);
      }

      if (product.quantity <= 0) {
        throw new Error(`${product.title} is no longer available.`);
      }

      lineItems.push({
        price_data: {
          currency: "usd",
         product_data: {
  name: product.title,
  metadata: {
    product_id: product.product_id,
  },
},
          unit_amount: product.price_cents,
        },
        quantity: 1,
      });
    }

    const origin =
      request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,

      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled`,
    });

    return Response.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return Response.json(
      {
        error: "Unable to create checkout session.",
      },
      { status: 500 }
    );
  }
}