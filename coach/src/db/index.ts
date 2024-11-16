import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import * as schema from "./schema";

const db = drizzle(sql, { schema });

export const getUserByAuthId = async ({ authId }: { authId: string }) => {
  const foundUser = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.authId, authId),
  });

  if (!foundUser) {
    return null;
  }

  return foundUser;
};

export const insertUser = async ({
  authId,
  email,
  firstName,
  lastName,
}: {
  authId: string;
  email: string;
  firstName: string;
  lastName: string | null;
}) => {
  const result = await db.insert(schema.usersTable).values({
    authId,
    email,
    firstName,
    lastName,
  });

  if (!result.rows.length) {
    console.log("error creating user!");
  }

  return null;
};
