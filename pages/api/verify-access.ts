import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { customer_id } = req.query;

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, customer_id as string));

    res.status(200).json({ valid: result.length > 0 });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
