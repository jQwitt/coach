import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { usersTable } from "./schema/users";

async function main() {
	const db = drizzle();

	const user: typeof usersTable.$inferInsert = {
		authId: "user.9999999",
		firstName: "Test",
		lastName: "Testerson",
		email: "test@test.com",
	};

	await db.insert(usersTable).values(user);
	console.log("New user created!");

	const users = await db.select().from(usersTable);
	console.log("Getting all users from the database: ", users);
	/*
  const users: {
    id: number;
    name: string;
    email: string;
  }[]
  */

	await db
		.update(usersTable)
		.set({
			email: "tested@updated.com",
		})
		.where(eq(usersTable.email, user.email));
	console.log("User info updated!");
}

main();
