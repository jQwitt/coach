import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users_table } from "./users";
import { workouts_lifting_exercises_table } from "./workouts";

export const user_lifting_exercises_table = pgTable("UserLiftingExercises", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// references
	userId: integer()
		.references(() => users_table.id, { onDelete: "cascade" })
		.notNull(),

	// data fields
	name: varchar({ length: 255 }).notNull().unique(),
	primaryTarget: varchar({ length: 100 }).notNull(),
	detailedTargets: varchar({ length: 100 }).array().notNull(),
});

export const user_lifting_exercises_relations = relations(
	user_lifting_exercises_table,
	({ many }) => ({
		user_lifting_exercises_table: many(workouts_lifting_exercises_table),
	}),
);
