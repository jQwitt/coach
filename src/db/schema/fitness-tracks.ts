import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { users_table } from "./users";

export const fitness_tracks_table = pgTable("FitnessTracks", {
	id: serial().primaryKey(),

	// references
	userId: integer()
		.references(() => users_table.id, { onDelete: "cascade" })
		.notNull(),

	name: varchar({ length: 255 }).notNull(),
});
