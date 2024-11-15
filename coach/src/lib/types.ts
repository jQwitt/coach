import * as schema from "@/db/schema";

export type User = typeof schema.usersTable.$inferSelect;
