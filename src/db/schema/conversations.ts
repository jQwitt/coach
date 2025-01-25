import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users_table } from "./users";

export const live_coach_conversations_table = pgTable("LiveCoachConversations", {
	conversationId: integer().generatedByDefaultAsIdentity().primaryKey(),

	userId: integer()
		.references(() => users_table.id, { onDelete: "cascade" })
		.notNull(),

	date: varchar({ length: 50 }).notNull(),
	intent: varchar({ length: 50 }).notNull(),
	fulfilled: boolean().default(false),
});
