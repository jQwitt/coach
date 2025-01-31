import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const subscription_plan_table = pgTable("SubscriptionPlans", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// data fields
	name: varchar({ length: 20 }).notNull().default("free"), // FREE, BUILDER, OLYMPIAN

	dailyConversationLimit: integer().notNull().default(1),
});
