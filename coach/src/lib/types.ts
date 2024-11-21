import * as schema from "@/db/_/schema";

export type User = typeof schema.usersTable.$inferSelect;
