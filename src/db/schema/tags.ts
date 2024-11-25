import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const user_tags = pgTable("UserTags", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// data fields
	name: varchar({ length: 100 }).notNull(),
	created: date().notNull().defaultNow(),
	updated: date(),
	tags: varchar({ length: 255 }).array(),
});
