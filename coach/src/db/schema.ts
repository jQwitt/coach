import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("Users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
});
