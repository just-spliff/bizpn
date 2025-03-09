import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface RequestBody {
  email: string;
  price: number;
  customerType: "individual" | "company";
  companyName?: string;
  taxId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, price, customerType, companyName, taxId } =
    req.body as RequestBody;

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let customerId: string | null = null;

    if (existingUser.length > 0) {
      customerId = existingUser[0].stripeCustomerId;
    }

    const taxExemptStatus: Stripe.Customer.TaxExempt =
      customerType === "company" ? "reverse" : "none";

    const baseParams = {
      email,
      metadata: {
        customer_type: customerType,
        company_name: companyName || "",
        tax_id: taxId || "",
      },
      tax_exempt: taxExemptStatus,
      invoice_settings: {
        custom_fields: companyName
          ? [
              { name: "Nazwa firmy", value: companyName },
              { name: "NIP", value: taxId || "Brak" },
            ]
          : [],
      },
    };

    let customer: Stripe.Customer;

    if (customerId) {
      customer = await stripe.customers.update(customerId, {
        ...baseParams,
        name: companyName || undefined,
        address: companyName
          ? { line1: companyName }
          : { line1: "Osoba prywatna" },
      });
    } else {
      customer = await stripe.customers.create({
        ...baseParams,
        name: companyName || undefined,
        address: companyName
          ? { line1: companyName }
          : { line1: "Osoba prywatna" },
      });
    }

    // 🔥 Dodanie NIP do tax_ids klienta Stripe
    if (customerType === "company" && taxId) {
      await stripe.customers.createTaxId(customer.id, {
        type: "eu_vat",
        value: taxId,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "blik"],
      customer: customer.id,
      billing_address_collection: "required",
      customer_update: {
        address: "auto",
        name: "auto",
      },
      custom_fields: [
        {
          key: "company_name",
          label: { type: "custom", custom: "Nazwa firmy" },
          type: "text",
          optional: true,
        },
        {
          key: "company_nip",
          label: { type: "custom", custom: "NIP" },
          type: "text",
          optional: true,
        },
      ],
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: "Ebook - Od zera do ecommerce milionera",
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      invoice_creation: {
        enabled: true,
      },
      automatic_tax: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    await db
      .insert(users)
      .values({
        stripeCustomerId: customer.id,
        email: email,
      })
      .onConflictDoUpdate({
        target: users.stripeCustomerId,
        set: { email: email },
      });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Błąd podczas procesu płatności:", error);
    return res.status(500).json({
      error: "Wystąpił błąd podczas inicjowania płatności",
      details: error instanceof Error ? error.message : "Nieznany błąd",
    });
  }
}
