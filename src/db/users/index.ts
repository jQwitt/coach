import { eq } from "drizzle-orm";

import db from "..";
import schema from "../schema";

export const getUserByAuthId = async ({ authId }: { authId: string }) => {
	const foundUser = await db.query.users_table.findFirst({
		where: (users, { eq }) => eq(users.authId, authId),
	});

	if (!foundUser) {
		console.log("user not found!");
		return null;
	}

	return foundUser;
};

export const emailIsRegistered = async ({ email }: { email: string }) => {
	const foundUser = await db.query.users_table.findFirst({
		where: (users, { eq }) => eq(users.email, email),
	});

	if (!foundUser) {
		return false;
	}

	return true;
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
	const result = await db.insert(schema.users_table).values({
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
		.delete(schema.users_table)
		.where(eq(schema.users_table.authId, authId))
		.returning();

	console.log(result);

	if (!result) {
		console.log("error deleting user!");
		return false;
	}

	return true;
};
