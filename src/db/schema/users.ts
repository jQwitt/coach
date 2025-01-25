import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { live_coach_conversations_table } from "./conversations";
import { lifting_exercises_table } from "./exercises";
import { plans_table } from "./plans";
import { workouts_lifting_table } from "./workouts";

export const users_table = pgTable("Users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// third party identifiers
	authId: varchar({ length: 255 }).notNull().unique(),

	// data fields
	firstName: varchar({ length: 50 }).notNull(),
	lastName: varchar({ length: 50 }),
	email: varchar({ length: 100 }).notNull().unique(),

	// payment fields
	plan: integer()
		.references(() => plans_table.id)
		.default(1),
});

export const users_relations = relations(users_table, ({ many, one }) => ({
	conversations: many(live_coach_conversations_table),
	exercises: many(lifting_exercises_table),
	workouts: many(workouts_lifting_table),
	plan: one(plans_table),
}));
