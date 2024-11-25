import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users_table } from "./users";

export const workouts_lifting_table = pgTable("WorkoutsLifting", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// references
	userId: integer().references(() => users_table.id),

	// data fields
	name: varchar({ length: 255 }),
	date: date(),
	exercises: varchar({ length: 255 }).array(),
	tags: varchar({ length: 255 }).array().default([]),
});
