"use server";

import {
	createWorkoutForUser,
	getWorkoutById,
	getWorkoutsByUser,
	getWorkoutsByUserSince,
} from "@/db/workouts";
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

	const result = await getWorkoutsByUser({ userId: id });

	return result.map((workout) => {
		const { exercises } = workout;

		return {
			...workout,
			exercises: decodeStringsToExercises(exercises),
		};
	});
};

export async function getWorkoutsSince({ date }: { date: string }) {
	const { id } = (await getCurrentUser()) ?? {};

	if (!id) {
		console.log("No user found!");
		return [];
	}

	const result = await getWorkoutsByUserSince({ userId: id, date });

	if (!result) {
		console.log("Error getting workouts since!");
		return [];
	}

	return result.map((workout) => {
		const { exercises } = workout;

		return {
			...workout,
			exercises: decodeStringsToExercises(exercises),
		};
	});
}

export async function getWorkout({ workoutId }: { workoutId: number }) {
	const result = await getWorkoutById({ id: workoutId });

	if (!result) {
		console.log("error getting workout!");
		return null;
	}

	return {
		...result,
		exercises: decodeStringsToExercises(result.exercises),
	};
}
