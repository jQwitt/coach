import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users_table } from "./users";

export const subscription_plan_table = pgTable("SubscriptionPlans", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// data fields
	name: varchar({ length: 20 }).notNull().default("free"), // FREE, BUILDER, OLYMPIAN

	dailyConversationLimit: integer().notNull().default(1),
});

export const subscription_plan_relations = relations(subscription_plan_table, ({ many }) => ({
	users: many(users_table),
}));
