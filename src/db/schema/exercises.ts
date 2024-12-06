import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users_table } from "./users";

export const user_lifting_exercises_table = pgTable("UserLiftingExercises", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// references
	userId: integer().references(() => users_table.id),

	// data fields
	name: varchar({ length: 255 }),
	oneRepMaxes: integer().array().default([0]),
	timesLogged: integer().default(1),
});
