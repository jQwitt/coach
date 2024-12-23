"use server";

import { getCurrentUser } from "@/app/actions";
import db from "@/db";
import schema from "@/db/schema";
import { encodeSets } from "@/lib/encoding";
import type { WorkoutLifting, WorkoutLiftingData } from "@/lib/types";

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

	await db.transaction(async (tx) => {
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
		}

		// Upsert exercises for the current user
		const upsertExercisesResult = await tx
			.insert(schema.user_lifting_exercises_table)
			.values(
				exercises.map(({ name }) => ({
					userId,
					name,
					primaryTarget: "", // TODO: get target information
					detailedTargets: [],
				})),
			)
			.onConflictDoNothing({
				target: schema.user_lifting_exercises_table.name,
			})
			.returning({
				id: schema.user_lifting_exercises_table.id,
				name: schema.user_lifting_exercises_table.name,
			});

		// Add all link table entires
		const { id: workoutId } = createWorkoutResult[0];
		const exerciseInfoByName = formatExerciseInfo(exercises);
		const insertWorkoutExercisesResult = await tx
			.insert(schema.workouts_lifting_exercises_table)
			.values(
				upsertExercisesResult.map(({ id: exerciseId, name }) => ({
					userId,
					workoutId,
					exerciseId,
					date: timing.date,
					...exerciseInfoByName[name],
				})),
			)
			.returning({
				id: schema.workouts_lifting_exercises_table.workoutId,
			});

		if (!insertWorkoutExercisesResult.length) {
			tx.rollback();
		}
	});

	return true;
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
