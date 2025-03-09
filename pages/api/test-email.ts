// pages/api/test-email.ts
import { EmailTemplate } from "@/components/EmailTemplate";
import sendEmail from "@/lib/email";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const downloadLink = "link";
  const stripeCustomerId = "123";
  const receiptUrl = "url";

  try {
    const result = await sendEmail({
      to: ["mgieraltowski02@gmail.com"],
      subject: "📚 Dostęp do ebooka aktywowany",
      react: React.createElement(EmailTemplate, {
        downloadLink,
        customerId: stripeCustomerId,
        receiptUrl: receiptUrl ?? undefined, // Upewnienie się, że `undefined` zamiast `null`
      }),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
