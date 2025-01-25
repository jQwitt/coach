"use server";

import { getCurrentUser } from "@/app/actions";
import db from "@/db";
import schema from "@/db/schema";
import { encodeSets } from "@/lib/encoding";
import type { WorkoutLifting, WorkoutLiftingData } from "@/lib/types";
import { and, eq } from "drizzle-orm";

export async function saveWorkoutLifting(
	data: Pick<WorkoutLifting, "name" | "timeStarted" | "timeCompleted" | "date" | "duration"> &
		WorkoutLiftingData,
) {
	const { id: userId } = (await getCurrentUser()) ?? {};
	if (!userId) {
		return false;
	}

	// Server Side Validation
	const { name, exercises, ...timing } = data;
	if (!name?.length || !exercises?.length) {
		return false;
	}
	for (const { name, sets } of exercises) {
		if (!name?.length) {
			return false;
		}
		for (const { count, reps } of sets) {
			if (!count || !reps) {
				return false;
			}
		}
	}

	return await db.transaction(async (tx) => {
		// Create a new workout for the current user
		const createWorkoutResult = await tx
			.insert(schema.workouts_lifting_table)
			.values({
				userId,
				name,
				...timing,
			})
			.returning({
				id: schema.workouts_lifting_table.id,
			});

		if (!createWorkoutResult.length) {
			tx.rollback();
			return false;
		}

		// Upsert exercises for the current user
		const upsertExercisesResult = [];
		for (const exercise of exercises) {
			const exerciseExists = await tx.query.lifting_exercises_table.findFirst({
				where: and(
					eq(schema.lifting_exercises_table.name, exercise.name),
					eq(schema.lifting_exercises_table.userId, userId),
				),
			});

			if (exerciseExists) {
				upsertExercisesResult.push({ id: exerciseExists.id, name: exercise.name });
			} else {
				const insertExerciseResult = await tx
					.insert(schema.lifting_exercises_table)
					.values({
						...exercise,
						userId,
					})
					.returning({
						id: schema.lifting_exercises_table.id,
						name: schema.lifting_exercises_table.name,
					});
				upsertExercisesResult.push(insertExerciseResult[0]);
			}
		}

		// Add all link table entires
		const { id: workoutId } = createWorkoutResult[0];
		const exerciseInfoByName = formatExerciseInfo(exercises);
		const insertWorkoutExercisesPayload = upsertExercisesResult.map(({ id: exerciseId, name }) => ({
			userId,
			workoutId,
			exerciseId,
			date: timing.date,
			...exerciseInfoByName[name],
		}));
		const insertWorkoutExercisesResult = await tx
			.insert(schema.workouts_lifting_exercises_table)
			.values(insertWorkoutExercisesPayload)
			.returning({
				id: schema.workouts_lifting_exercises_table.workoutId,
			});

		if (!insertWorkoutExercisesResult.length) {
			tx.rollback();
			return false;
		}

		return true;
	});
}

function formatExerciseInfo(exercises: WorkoutLiftingData["exercises"]) {
	const result: Record<
		string,
		{ totalSets: number; totalReps: number; maxWeight: string; serializedSetData: string[] }
	> = {};
	for (const exercise of exercises) {
		const { name, sets } = exercise;
		let totalSets = 0;
		let totalReps = 0;
		let maxWeight = -1;

		for (const { count, reps, weight } of sets) {
			totalSets += count;
			totalReps += reps;
			maxWeight = Math.max(maxWeight, weight);
		}

		result[name] = {
			totalSets,
			totalReps,
			maxWeight: maxWeight.toString(),
			serializedSetData: [encodeSets(exercise)],
		};
	}

	return result;
}
