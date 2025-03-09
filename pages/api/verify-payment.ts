// pages/api/verify-payment.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const sessionId = req.query.session_id as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (session.payment_status !== "paid") {
      return res.status(400).json({ success: false });
    }

    return res.status(200).json({
      success: true,
      customerEmail: session.customer_details?.email,
      amount: session.amount_total,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ success: false });
  }
}
