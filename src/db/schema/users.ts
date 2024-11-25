import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { user_tags } from "./tags";

export const users_table = pgTable("Users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// third party identifiers
	authId: varchar({ length: 255 }).notNull().unique(),

	// references
	tags: integer()
		.references(() => user_tags.id)
		.array()
		.default([]),

	// data fields
	firstName: varchar({ length: 50 }).notNull(),
	lastName: varchar({ length: 50 }),
	email: varchar({ length: 100 }).notNull().unique(),
	exerciseNames: varchar({ length: 255 }).array().default([]),
});
