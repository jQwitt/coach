"use server";

import { User } from "@/lib/types";
import { insertUser, getUserByAuthId } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

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

export const getCurrentUser = async () => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("Clerk user not found");
    }
    const { id } = clerkUser;

    const user = await getUserByAuthId({ authId: id });
    if (!user) {
      throw new Error(`User with authId ${id} not found`);
    }

    const { firstName, lastName } = user;

    return { firstName, lastName };
  } catch (error) {
    console.log(error);
  }

  return {};
};
