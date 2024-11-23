"use server";

import { User, WorkoutLiftingData } from "@/lib/types";
import { insertUser, getUserByAuthId, deleteUser } from "@/db/users";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { createWorkoutForUser, getWorkoutsByUser } from "@/db/workouts";
import { toStringArray } from "@/lib/utils";

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

export const getCurrentUser = async (): Promise<User | null> => {
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

    return { ...user };
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const deleteCurrentUser = async () => {
  try {
    const authClient = await clerkClient();
    const clerkUser = await currentUser();
    if (!clerkUser) {
      throw new Error("Clerk user not found");
    }

    // Delete user data
    const { id } = clerkUser;
    const result = await deleteUser({ authId: id });
    if (!result) {
      throw new Error("User not deleted from Database");
    }

    // Delete Clerk user
    const clerkResult = await authClient.users.deleteUser(id);
    if (!clerkResult) {
      throw new Error("User not deleted from Clerk");
    }

    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
};

export const createWorkoutByUser = async ({
  data,
}: {
  data: WorkoutLiftingData & { userId: number };
}) => {
  const { userId, exercises } = data;
  const toInsert = {
    ...data,
    date: new Date().toLocaleString(),
    exercises: toStringArray(exercises),
    userId,
  };

  await createWorkoutForUser({ data: toInsert });
};

export const getWorkouts = async () => {
  const { id } = (await getCurrentUser()) ?? {};

  if (!id) {
    console.log("No user found!");
    return [];
  }

  const result = await getWorkoutsByUser({ id });

  return result.map((workout) => {
    const { exercises } = workout;

    return {
      ...workout,
      exercises: exercises?.map((e) => JSON.parse(e)) ?? [],
    };
  });
};
