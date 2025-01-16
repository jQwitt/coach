import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const plans_table = pgTable("PlanTable", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// data fields
	name: varchar({ length: 20 }).notNull().default("free"), // FREE, BUILDER, OLYMPIAN

	dailyConversationLimit: integer().notNull().default(1),
});
