import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { users_table } from "./users";
import { workouts_lifting_exercises_table } from "./workouts";

export const lifting_exercises_table = pgTable("LiftingExercises", {
	id: serial("id").primaryKey(),

	// references
	userId: integer()
		.references(() => users_table.id, { onDelete: "cascade" })
		.notNull(),

	// data fields
	name: varchar({ length: 255 }).notNull(),
	primaryTarget: varchar({ length: 100 }).notNull(),
	detailedTargets: varchar({ length: 100 }).array().notNull(),
});

export const lifting_exercises_relations = relations(lifting_exercises_table, ({ many, one }) => ({
	workouts: many(workouts_lifting_exercises_table),
	exercises: one(users_table, {
		fields: [lifting_exercises_table.userId],
		references: [users_table.id],
	}),
}));
