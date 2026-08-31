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

      const purchases = [];

      for (const lineItem of lineItems.data) {
        const product = lineItem.price?.product;

        const productId =
          typeof product === "object"
            ? product.metadata?.product_id
            : null;

        const purchasedQuantity =
          Number(lineItem.quantity) || 1;

        if (!productId) {
          throw new Error(
            "Stripe product missing OSS product_id metadata."
          );
        }

        if (
          !Number.isInteger(purchasedQuantity) ||
          purchasedQuantity < 1
        ) {
          throw new Error(
            `Invalid purchased quantity for ${productId}.`
          );
        }

        purchases.push({
          product_id: productId,
          quantity: purchasedQuantity,
        });
      }

      if (purchases.length === 0) {
        throw new Error(
          "Completed Stripe session contained no OSS products."
        );
      }

      /*
       * This single database statement does four things:
       *
       * 1. Collects the quantities purchased from Stripe.
       * 2. Verifies that Neon still has enough inventory.
       * 3. Claims this Stripe event only if inventory is valid.
       * 4. Reduces inventory only if this event was newly claimed.
       *
       * Because stripe_events.event_id is a primary key,
       * Stripe retries cannot decrement inventory twice.
       */

      const result = await sql`
        WITH requested AS (
          SELECT
            product_id,
            SUM(quantity)::INTEGER AS quantity
          FROM json_to_recordset(
            ${JSON.stringify(purchases)}::json
          ) AS purchase(
            product_id TEXT,
            quantity INTEGER
          )
          GROUP BY product_id
        ),

        valid_inventory AS (
          SELECT
            requested.product_id,
            requested.quantity
          FROM requested
          INNER JOIN inventory
            ON inventory.product_id =
               requested.product_id
          WHERE
            inventory.active = TRUE
            AND inventory.quantity >=
                requested.quantity
        ),

        event_claim AS (
          INSERT INTO stripe_events (event_id)
          SELECT ${event.id}
          WHERE
            (
              SELECT COUNT(*)
              FROM valid_inventory
            ) =
            (
              SELECT COUNT(*)
              FROM requested
            )
          ON CONFLICT (event_id) DO NOTHING
          RETURNING event_id
        ),

        updated_inventory AS (
          UPDATE inventory
          SET
            quantity =
              inventory.quantity -
              requested.quantity,
            updated_at = NOW()
          FROM requested
          WHERE
            inventory.product_id =
              requested.product_id
            AND EXISTS (
              SELECT 1
              FROM event_claim
            )
          RETURNING
            inventory.product_id,
            inventory.quantity
        )

        SELECT
          (
            SELECT COUNT(*)
            FROM requested
          )::INTEGER AS requested_count,

          (
            SELECT COUNT(*)
            FROM valid_inventory
          )::INTEGER AS valid_count,

          (
            SELECT COUNT(*)
            FROM event_claim
          )::INTEGER AS claimed_count,

          (
            SELECT COUNT(*)
            FROM updated_inventory
          )::INTEGER AS updated_count
      `;

      const processingResult = result[0];

      const requestedCount =
        Number(processingResult.requested_count);

      const validCount =
        Number(processingResult.valid_count);

      const claimedCount =
        Number(processingResult.claimed_count);

      const updatedCount =
        Number(processingResult.updated_count);

      /*
       * If the event already exists, Stripe is retrying a
       * webhook we successfully processed before.
       * Return 200 without touching inventory.
       */
      if (claimedCount === 0) {
        const existingEvent = await sql`
          SELECT event_id
          FROM stripe_events
          WHERE event_id = ${event.id}
          LIMIT 1
        `;

        if (existingEvent.length > 0) {
          console.log(
            `Stripe event ${event.id} already processed.`
          );

          return new Response("Already processed", {
            status: 200,
          });
        }
      }

      /*
       * A paid order reached us, but current Neon inventory
       * could not satisfy every purchased item.
       */
      if (validCount !== requestedCount) {
        throw new Error(
          `Inventory validation failed for Stripe event ${event.id}.`
        );
      }

      if (
        claimedCount !== 1 ||
        updatedCount !== requestedCount
      ) {
        throw new Error(
          `Inventory update incomplete for Stripe event ${event.id}.`
        );
      }

      console.log(
        `Stripe event ${event.id} processed successfully.`
      );
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