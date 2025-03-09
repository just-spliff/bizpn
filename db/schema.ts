import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    stripeCustomerId: varchar("stripe_customer_id").unique().notNull(),
    email: varchar("email").notNull(),
  },
  (table) => ({
    customerIdIdx: index("customer_id_idx").on(table.stripeCustomerId),
  })
);
