import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { users_table } from "./schema/users";

async function main() {
	const db = drizzle();

	const user: typeof users_table.$inferInsert = {
		authId: "user.9999999",
		firstName: "Test",
		lastName: "Testerson",
		email: "test@test.com",
	};

	await db.insert(users_table).values(user);
	console.log("New user created!");

	const users = await db.select().from(users_table);
	console.log("Getting all users from the database: ", users);
	/*
  const users: {
    id: number;
    name: string;
    email: string;
  }[]
  */

	await db
		.update(users_table)
		.set({
			email: "tested@updated.com",
		})
		.where(eq(users_table.email, user.email));
	console.log("User info updated!");
}

main();
