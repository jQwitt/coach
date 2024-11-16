"use server";

import { User } from "@/lib/types";
import { insertUser, getUserByAuthId } from "@/db";

export const createUser = async ({
  authId,
  email,
  firstName,
  lastName,
}: Pick<User, "authId" | "email" | "firstName" | "lastName">) => {
  await insertUser({
    authId,
    email,
    firstName,
    lastName,
  });
};

export const getUser = async (authId: string) => {
  return await getUserByAuthId({ authId });
};
