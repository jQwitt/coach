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
	data,
}: {
	userId: number;
	data: Omit<UserExerciseLifting, "id" | "userId">;
}) {
	const result = await db
		.insert(schema.user_lifting_exercises_table)
		.values({
			...data,
			userId,
		})
		.returning();

	if (!result.length) {
		console.log(`error creating exercise for user ${userId}`);
		return false;
	}

	return true;
}

export async function updateExerciseForUser({
	userId,
	exerciseId,
	data,
}: { userId: number; exerciseId: number; data: Partial<UserExerciseLifting> }) {
	if (!userId) {
		return false;
	}

	const result = await db
		.update(schema.user_lifting_exercises_table)
		.set({
			...data,
		})
		.where(
			and(
				eq(schema.user_lifting_exercises_table.userId, userId),
				eq(schema.user_lifting_exercises_table.id, exerciseId),
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

export async function getExercisesByWorkoutId({
	userId,
	workoutId,
}: { userId: number; workoutId: number }) {
	const result = await db
		.select({
			name: schema.user_lifting_exercises_table.name,
			totalSets: schema.workouts_lifting_exercises_table.totalSets,
			totalReps: schema.workouts_lifting_exercises_table.totalReps,
			maxWeight: schema.workouts_lifting_exercises_table.maxWeight,
			serializedSetData: schema.workouts_lifting_exercises_table.serializedSetData,
		})
		.from(schema.workouts_lifting_exercises_table)
		.where(
			and(
				eq(schema.workouts_lifting_exercises_table.userId, userId),
				eq(schema.workouts_lifting_exercises_table.workoutId, workoutId),
			),
		)
		.leftJoin(
			schema.user_lifting_exercises_table,
			eq(
				schema.workouts_lifting_exercises_table.exerciseId,
				schema.user_lifting_exercises_table.id,
			),
		);

	if (!result) {
		console.log(`No workout with id: ${workoutId}!`);
		return null;
	}

	return result;
}

export async function getExerciseHistoryForUser({
	userId,
	exerciseId,
}: { userId: number; exerciseId: number }) {
	const result = await db
		.select({
			timeCompleted: schema.workouts_lifting_table.timeCompleted,
			totalSets: schema.workouts_lifting_exercises_table.totalSets,
			totalReps: schema.workouts_lifting_exercises_table.totalReps,
			maxWeight: schema.workouts_lifting_exercises_table.maxWeight,
		})
		.from(schema.workouts_lifting_exercises_table)
		.where(
			and(
				eq(schema.workouts_lifting_exercises_table.userId, userId),
				eq(schema.workouts_lifting_exercises_table.exerciseId, exerciseId),
			),
		)
		.leftJoin(
			schema.workouts_lifting_table,
			eq(schema.workouts_lifting_exercises_table.workoutId, schema.workouts_lifting_table.id),
		);

	if (!result) {
		console.log(`No exercise with id: ${exerciseId}!`);
		return [];
	}

	return result;
}
