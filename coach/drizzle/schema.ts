import { pgTable, unique, integer, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
  "Users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }),
    email: varchar({ length: 255 }).notNull(),
  },
  (table) => {
    return {
      usersEmailUnique: unique("Users_email_unique").on(table.email),
    };
  }
);
