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

      if (!session.customer || !session.customer_details?.email) {
        throw new Error("Brak wymaganych danych klienta");
      }

      const [user] = await db
        .insert(users)
        .values({
          stripeCustomerId: session.customer as string,
          email: session.customer_details.email,
        })
        .onConflictDoUpdate({
          target: users.stripeCustomerId,
          set: { email: session.customer_details.email },
        })
        .returning();

      const attachments = [];
      let receiptUrl = null;

      // Obsługa faktury dla subskrypcji
      if (session.invoice) {
        try {
          const invoice = await stripe.invoices.retrieve(
            session.invoice as string
          );

          // Dodaj debugowanie
          console.log("Invoice PDF URL:", invoice.invoice_pdf);

          if (invoice.invoice_pdf) {
            const response = await fetch(invoice.invoice_pdf);

            // Sprawdź status odpowiedzi
            console.log("PDF response status:", response.status);

            if (!response.ok) throw new Error(`Błąd HTTP: ${response.status}`);

            const pdfBuffer = await response.arrayBuffer();

            // Sprawdź rozmiar pliku
            console.log("PDF size:", pdfBuffer.byteLength, "bytes");

            attachments.push({
              content: Buffer.from(pdfBuffer),
              filename: `faktura_${session.id}.pdf`,
              contentType: "application/pdf",
            });
          }
        } catch (error) {
          console.error("Błąd pobierania faktury:", error);
        }
      }

      // Obsługa potwierdzenia płatności jednorazowej
      if (
        session.payment_intent &&
        typeof session.payment_intent === "string"
      ) {
        try {
          const paymentIntent = await stripe.paymentIntents.retrieve(
            session.payment_intent,
            {
              expand: ["latest_charge"], // Kluczowa zmiana - rozszerzamy o charge
            }
          );

          // TypeScript wymaga teraz jawnej konwersji typów
          const latestCharge = paymentIntent.latest_charge as Stripe.Charge;

          // Pobieramy URL z rozszerzonego obiektu
          receiptUrl = latestCharge?.receipt_url;
        } catch (error) {
          console.error("Błąd pobierania potwierdzenia:", error);
        }
      }

      const downloadLink = `https://bizpioneer.vercel.app/success?session_id=${session.id}`;
      const emailHtml = `
        <html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Potwierdzenie zakupu - Ebook: Od Zera Do Ecommerce Milionera</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7fafc;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Główny kontener -->
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <!-- Nagłówek -->
                    <tr>
                        <td style="padding: 40px 32px 24px; text-align: center;">
                            <div style="background-color: #5eeb5b1a; display: inline-block; padding: 16px; border-radius: 9999px;">
                                ✅
                            </div>
                            <h1 style="font-size: 26px; color: #1a202c; margin: 24px 0 16px;">
                                Płatność zakończona sukcesem!
                            </h1>
                            <p style="color: #4a5568; line-height: 1.5;">
                                Zakup udany! Twój ebook jest gotowy do pobrania.
                            </p>
                        </td>
                    </tr>

                    <!-- Sekcja linku -->
                    <tr>
                        <td style="padding: 0 32px 24px;">
                            <div style="background: #f7fafc; border-radius: 8px; padding: 16px;">
                                <p style="color: #718096; margin: 0 0 8px; font-size: 14px;">
                                    Twój link dostępu:
                                </p>
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <p style="color: #5EEB5B; word-break: break-all; text-decoration: none;">
                                      ${downloadLink}
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <!-- Przycisk pobierania -->
                    <tr>
                        <td style="padding: 0 32px 24px;">
                            <a href=${downloadLink} style="display: block; background-color: #5EEB5B; color: white; text-decoration: none; padding: 16px; border-radius: 8px; text-align: center; font-weight: bold; transition: background-color 0.3s;">
                                Pobierz ebooka
                            </a>
                        </td>
                    </tr>

                    <!-- Ważne informacje -->
                    <tr>
                        <td style="padding: 0 32px 40px;">
                            <div style="background-color: #5eeb5b1a; padding: 24px; border-radius: 8px;">
                                <h3 style="color: #1a202c; margin: 0 0 16px; font-size: 18px;">
                                    Ważne informacje:
                                </h3>
                                <ul style="color: #4a5568; padding-left: 20px; margin: 0; line-height: 1.6;">
                                    <li>Plik PDF działa na wszystkich urządzeniach</li>
                                    <li>Link dostępu jest aktywny bezterminowo – zapisz go!</li>
                                    <li>Masz problem z pobraniem?<br>Napisz do nas: pomoc@ecommercebook.pl</li>
                                    <li>Potwierdzenie płatności: <a href="${receiptUrl}">Pobierz</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>

                    <!-- Stopka -->
                    <tr>
                        <td style="padding: 24px 32px; background-color: #f7fafc; border-radius: 0 0 12px 12px;">
                            <p style="color: #718096; font-size: 12px; text-align: center; margin: 0;">
                                © 2025 bizpioneer.eu<br>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
      `;

      await sendEmail({
        to: [user.email],
        subject: "📚 Dostęp do ebooka aktywowany",
        html: emailHtml,
        attachments: attachments,
      });
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
