import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return Response.json(
        { error: "Missing session ID." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid =
      session.payment_status === "paid";

    return Response.json({
      paid,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error("Stripe verification error:", error);

    return Response.json(
      { error: "Unable to verify checkout session." },
      { status: 500 }
    );
  }
}