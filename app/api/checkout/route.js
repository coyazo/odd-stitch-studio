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
    inventory_type,
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

      const availableQuantity = Number(product.quantity);

if (availableQuantity <= 0) {
  throw new Error(`${product.title} is no longer available.`);
}

const requestedQuantity = Number(item.quantity ?? 1);

if (
  !Number.isInteger(requestedQuantity) ||
  requestedQuantity < 1
) {
  throw new Error(`Invalid quantity for ${product.title}.`);
}

// One-of-a-kind OSS works can only be acquired once.
if (
  product.inventory_type === "unique" &&
  requestedQuantity !== 1
) {
  throw new Error(
    `${product.title} is a one-of-a-kind work and is limited to one.`
  );
}

// Limited-stock works cannot exceed the live Neon inventory.
if (
  product.inventory_type === "limited" &&
  requestedQuantity > availableQuantity
) {
  throw new Error(
    `Only ${availableQuantity} of ${product.title} remain available.`
  );
}

// Reject an inventory type we do not explicitly recognize.
if (
  product.inventory_type !== "unique" &&
  product.inventory_type !== "limited"
) {
  throw new Error(
    `Invalid inventory type for ${product.title}.`
  );
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
  quantity: requestedQuantity,
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