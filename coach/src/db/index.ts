import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { currentUser } from "@clerk/nextjs/server";

import * as schema from "./schema";

export const db = drizzle(sql, { schema });

export const getTestUser = async () => {
  return db.query.usersTable.findFirst({ with: { id: 1 } });
};

export default async function getCurrentUser() {
  const clerkUser = await currentUser();

  if (!clerkUser || !clerkUser.id) {
    return null;
  }

  const foundUser = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.authId, clerkUser.id),
  });

  if (!foundUser) {
    return null;
  }

  return foundUser;
}
