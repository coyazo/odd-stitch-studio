import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRODUCT_CATALOG = {
  alice: {
    name: "Alice Weekender",
    priceCents: 10000,
  },
  rabbit: {
    name: "Down the Rabbit Hole Carry-Along",
    priceCents: 8000,
  },
  bcbgs: {
    name: "Big City Block",
    priceCents: 15000,
  },
  scbgs: {
    name: "Small City Block",
    priceCents: 7500,
  },
  cbls: {
    name: "E-City Block",
    priceCents: 2500,
  },
};

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

    const lineItems = cart.map((item) => {
      const product = PRODUCT_CATALOG[item.id];

      if (!product) {
        throw new Error(`Invalid product ID: ${item.id}`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.priceCents,
        },
        quantity: 1,
      };
    });

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