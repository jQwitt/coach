import { and, eq, gte, lt } from "drizzle-orm";
import db from "..";
import schema from "../schema";

export async function getWorkoutsByUser({ userId }: { userId: number }) {
	const workouts = await db.query.workouts_lifting_table.findMany({
		where: (workouts, { eq }) => eq(workouts.userId, userId),
		orderBy: (workouts, { desc }) => desc(workouts.timeCompleted),
	});

	if (!workouts) {
		console.log(`No workouts for user: ${userId}!`);
		return [];
	}

	return workouts;
}

export async function getWorkoutsWithExercisesByUserForDateRange({
	userId,
	start,
	end,
}: { userId: number; start: string; end: string }) {
	const result = await db
		.select({
			workoutId: schema.workouts_lifting_table.id,
			timeCompleted: schema.workouts_lifting_table.timeCompleted,
			exerciseName: schema.user_lifting_exercises_table.name,
			primaryTarget: schema.user_lifting_exercises_table.primaryTarget,
			totalSets: schema.workouts_lifting_exercises_table.totalSets,
			totalReps: schema.workouts_lifting_exercises_table.totalReps,
			maxWeight: schema.workouts_lifting_exercises_table.maxWeight,
		})
		.from(schema.workouts_lifting_table)
		.where(
			and(
				eq(schema.workouts_lifting_table.userId, userId),
				gte(schema.workouts_lifting_table.timeCompleted, start),
				lt(schema.workouts_lifting_table.timeCompleted, end),
			),
		)
		.rightJoin(
			schema.workouts_lifting_exercises_table,
			eq(schema.workouts_lifting_table.id, schema.workouts_lifting_exercises_table.workoutId),
		)
		.rightJoin(
			schema.user_lifting_exercises_table,
			eq(
				schema.workouts_lifting_exercises_table.exerciseId,
				schema.user_lifting_exercises_table.id,
			),
		);

	if (!result) {
		console.log(`No workouts for user: ${userId}!`);
		return [];
	}

	return result;
}

export async function getWorkoutById({ userId, id }: { userId: number; id: number }) {
	const result = await db.query.workouts_lifting_table.findFirst({
		where: (workouts, { eq, and }) => and(eq(workouts.userId, userId), eq(workouts.id, id)),
	});

	if (!result) {
		console.log(`No workout with id: ${id}!`);
		return null;
	}

	return result;
}
