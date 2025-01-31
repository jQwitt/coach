ALTER TABLE "PlanTable" RENAME TO "SubscriptionPlanTable";--> statement-breakpoint
ALTER TABLE "Users" DROP CONSTRAINT "Users_plan_PlanTable_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Users" ADD CONSTRAINT "Users_plan_SubscriptionPlanTable_id_fk" FOREIGN KEY ("plan") REFERENCES "public"."SubscriptionPlanTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
