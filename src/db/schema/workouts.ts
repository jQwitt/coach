import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { user_lifting_exercises_table } from "./exercises";
import { user_tag_table } from "./tags";
import { users_table } from "./users";

export const workouts_lifting_table = pgTable("WorkoutsLifting", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// references
	userId: integer().references(() => users_table.id),
	tags: integer()
		.references(() => user_tag_table.id)
		.array()
		.default([]),
	exercises: integer()
		.references(() => user_lifting_exercises_table.id)
		.array()
		.default([]),

	// data fields
	name: varchar({ length: 255 }),
	date: varchar({ length: 50 }),
	timeStarted: date(),
	timeCompleted: date(),
	duration: varchar({ length: 50 }),
	exercisesSerial: varchar({ length: 255 }).array(),
});
