import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users_table } from "./users";

export const user_lifting_exercises_table = pgTable("UserLiftingExercises", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// references
	userId: integer()
		.references(() => users_table.id)
		.notNull(),

	// data fields
	name: varchar({ length: 255 }).notNull(),
	oneRepMaxes: integer().array().notNull().default([0]),
	timesLogged: integer().notNull().default(1),
});
