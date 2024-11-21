import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("Users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  authId: varchar({ length: 255 }).notNull().unique(),
  firstName: varchar({ length: 50 }).notNull(),
  lastName: varchar({ length: 50 }),
  email: varchar({ length: 100 }).notNull().unique(),
});
