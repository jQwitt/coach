"use server";

import {
	deleteUser,
	emailIsRegistered,
	getUserByAuthId,
	getUserProfileByAuthId,
	insertUser,
} from "@/db/users";
import type { User } from "@/lib/types";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

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

export const emailExists = async (email: string) => {
	return await emailIsRegistered({ email });
};

export const getUserProfile = async () => {
	try {
		const clerkUser = await currentUser();
		if (!clerkUser) {
			throw new Error("Clerk user not found");
		}
		const { id } = clerkUser;

		const user = await getUserProfileByAuthId({ authId: id });
		if (!user) {
			throw new Error(`User with authId ${id} not found`);
		}

		return user;
	} catch (error) {
		console.log(error);
	}

	return null;
};
