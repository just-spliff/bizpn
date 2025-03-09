import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import sendEmail from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const config = {
  api: { bodyParser: false },
};

async function handleInvoiceAttachment(session: Stripe.Checkout.Session) {
  const attachments = [];
  if (session.invoice) {
    try {
      const invoice = await stripe.invoices.retrieve(session.invoice as string);
      if (invoice.invoice_pdf) {
        const response = await fetch(invoice.invoice_pdf);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const pdfBuffer = await response.arrayBuffer();
        attachments.push({
          content: Buffer.from(pdfBuffer),
          filename: `invoice_${session.id}.pdf`,
          contentType: "application/pdf",
        });
      }
    } catch (error) {
      console.error("Error handling invoice:", error);
    }
  }
  return attachments;
}

async function handlePaymentReceipt(session: Stripe.Checkout.Session) {
  let receiptUrl = null;
  if (session.payment_intent) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent as string,
        { expand: ["latest_charge"] }
      );
      const latestCharge = paymentIntent.latest_charge as Stripe.Charge;
      receiptUrl = latestCharge?.receipt_url;
    } catch (error) {
      console.error("Error retrieving receipt:", error);
    }
  }
  return receiptUrl;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sig = req.headers["stripe-signature"]!;
    const body = await buffer(req);

    const event = stripe.webhooks.constructEvent(
      body.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (
        !session.customer ||
        typeof session.customer !== "string" ||
        !session.customer_details?.email
      ) {
        throw new Error("Missing required customer data");
      }

      // Aktualizacja danych użytkownika
      const [user] = await db
        .insert(users)
        .values({
          stripeCustomerId: session.customer,
          email: session.customer_details.email,
        })
        .onConflictDoUpdate({
          target: users.stripeCustomerId,
          set: {
            email: session.customer_details.email,
          },
        })
        .returning();

      // Pobierz załączniki i potwierdzenie płatności
      const attachments = await handleInvoiceAttachment(session);
      const receiptUrl = await handlePaymentReceipt(session);

      // Przygotuj link i treść emaila
      const downloadLink = `https://bizpioneer.vercel.app/success?session_id=${session.id}`;

      const emailContent = `
        <html>
          <!-- ... (pozostaw niezmienioną strukturę HTML) ... -->
          <li>Potwierdzenie płatności: ${
            receiptUrl ? `<a href="${receiptUrl}">Pobierz</a>` : "niedostępne"
          }</li>
          <!-- ... -->
          ${downloadLink}
        </html>
      `;

      // Wysłanie emaila z dodatkowym logowaniem
      console.log("Attempting to send email to:", user.email);
      try {
        await sendEmail({
          to: [user.email],
          subject: "📚 Dostęp do ebooka aktywowany",
          html: emailContent,
          attachments,
        });
        console.log("Email successfully sent to:", user.email);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        throw emailError;
      }
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
