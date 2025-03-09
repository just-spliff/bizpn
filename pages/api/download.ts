// pages/api/download.ts
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Cache dla limitów pobrań (w produkcji użyj Redis/Memcached)
const downloadCounts = new Map<string, number>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // 1. Weryfikacja metody HTTP
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // 2. Pobranie parametru sesji Stripe
    const { session_id } = req.query;
    if (!session_id || Array.isArray(session_id)) {
      return res.status(400).json({ error: "Invalid session ID" });
    }

    // 3. Weryfikacja sesji Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });

    // 4. Sprawdzenie statusu płatności
    if (session.payment_status !== "paid") {
      return res.status(403).json({ error: "Payment not completed" });
    }

    // 5. Limit pobrań (5 prób)
    const currentCount = downloadCounts.get(session_id) || 0;
    if (currentCount >= 5) {
      return res.status(429).json({ error: "Download limit exceeded" });
    }

    // 6. Ścieżka do pliku
    const filePath = path.join(process.cwd(), "protected", "ebook.pdf");

    // 7. Weryfikacja istnienia pliku
    if (!fs.existsSync(filePath)) {
      return res.status(500).json({ error: "File not available" });
    }

    // 8. Nagłówki odpowiedzi
    const stat = fs.statSync(filePath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", stat.size);
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Od-Zera-Do-Ecommerce-Milionera.pdf"'
    );
    res.setHeader("Cache-Control", "no-store, max-age=0");

    // 9. Aktualizacja licznika
    downloadCounts.set(session_id, currentCount + 1);

    // 10. Streamowanie pliku
    const stream = fs.createReadStream(filePath);

    stream.on("error", (error) => {
      console.error("File stream error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Błąd strumieniowania pliku" });
      }
    });

    stream.pipe(res);
  } catch (error) {
    console.error("Pełny błąd API:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Nieznany błąd serwera";

    // Zwróć szczegółowy błąd w development
    if (process.env.NODE_ENV === "development") {
      res.status(500).json({
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
      });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
