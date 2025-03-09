CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'failed');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"stripe_customer_id" varchar NOT NULL,
	"email" varchar NOT NULL,
	"payment_status" "payment_status" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
--> statement-breakpoint
CREATE INDEX "customer_id_idx" ON "users" USING btree ("stripe_customer_id");