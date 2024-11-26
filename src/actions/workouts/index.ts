"use server";

import { createWorkoutForUser, getWorkoutsByUser } from "@/db/workouts";
import { decodeStringsToExercises, encodeExercisesAsStrings } from "@/lib/encoding";
import type { WorkoutLiftingData } from "@/lib/types";
import { getCurrentUser } from "../user";

export const createWorkoutByUser = async ({
	data,
}: {
	data: WorkoutLiftingData & { userId: number; date: string };
}) => {
	const { userId, exercises } = data;
	const toInsert = {
		...data,
		exercises: encodeExercisesAsStrings(exercises),
		userId,
	};

	return await createWorkoutForUser({ data: toInsert });
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
			exercises: decodeStringsToExercises(exercises),
		};
	});
};
