ALTER TABLE "users" DROP COLUMN "first_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "last_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "payment_status";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updated_at";--> statement-breakpoint
DROP TYPE "public"."payment_status";