import { eq } from "drizzle-orm";

import db from "..";
import schema from "../schema";

export const getUserByAuthId = async ({ authId }: { authId: string }) => {
  const foundUser = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.authId, authId),
  });

  if (!foundUser) {
    console.log("user not found!");
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
    return false;
  }

  return true;
};

export const deleteUser = async ({ authId }: { authId: string }) => {
  const result = await db
    .delete(schema.usersTable)
    .where(eq(schema.usersTable.authId, authId))
    .returning();

  console.log(result);

  if (!result) {
    console.log("error deleting user!");
    return false;
  }

  return true;
};
