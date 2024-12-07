import type { UserExerciseLifting } from "@/lib/types";
import { and, eq } from "drizzle-orm";
import db from "..";
import schema from "../schema";

export async function getExercisesByUser({ userId }: { userId: number }) {
	const result = await db.query.user_lifting_exercises_table.findMany({
		where: (exercises, { eq }) => eq(exercises.userId, userId),
	});

	if (!result) {
		console.log(`No exercises for user: ${userId}!`);
		return [];
	}

	return result;
}

export async function createExerciseForUser({
	userId,
	name,
}: {
	userId: number;
	name: string;
}) {
	const result = await db
		.insert(schema.user_lifting_exercises_table)
		.values({
			userId,
			name,
		})
		.returning();

	if (!result.length) {
		console.log(`error creating exercise for user ${userId}`);
		return false;
	}

	return true;
}

export async function updateExerciseForUser(data: UserExerciseLifting) {
	const { name, oneRepMaxes, timesLogged, userId, id } = data;

	const result = await db
		.update(schema.user_lifting_exercises_table)
		.set({
			name,
			oneRepMaxes,
			timesLogged,
		})
		.where(
			and(
				eq(schema.user_lifting_exercises_table.userId, userId),
				eq(schema.user_lifting_exercises_table.id, id),
			),
		)
		.returning();

	if (!result) {
		console.log(`error updating exercise name for user ${userId}`);
		return false;
	}

	return true;
}

export async function deleteExerciseForUser({ userId, id }: { userId: number; id: number }) {
	const result = await db
		.delete(schema.user_lifting_exercises_table)
		.where(
			and(
				eq(schema.user_lifting_exercises_table.userId, userId),
				eq(schema.user_lifting_exercises_table.id, id),
			),
		)
		.returning();

	if (!result) {
		console.log(`error deleting exercise for user ${userId}`);
		return false;
	}

	return true;
}
