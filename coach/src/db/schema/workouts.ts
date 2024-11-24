import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const workouts_lifting_table = pgTable("WorkoutsLifting", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => usersTable.id),
  name: varchar({ length: 255 }),
  date: date(),
  exercises: varchar({ length: 255 }).array(),
});
