"use server";

import {
	createWorkoutForUser,
	getWorkoutById,
	getWorkoutsByUser,
	getWorkoutsByUserInDateRange,
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
		exercisesSerial: encodeExercisesAsStrings(exercises),
		exercises: [],
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
		const { exercisesSerial } = workout;

		return {
			...workout,
			exercisesSerial: decodeStringsToExercises(exercisesSerial),
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
		const { exercisesSerial } = workout;

		return {
			...workout,
			exercisesSerial: decodeStringsToExercises(exercisesSerial),
		};
	});
}

export async function getWorkoutsInRange({ start, end }: { start: string; end: string }) {
	const { id } = (await getCurrentUser()) ?? {};

	if (!id) {
		console.log("No user found!");
		return [];
	}

	const result = await getWorkoutsByUserInDateRange({ userId: id, start, end });

	if (!result) {
		console.log("Error getting workouts in timeframe!");
		return [];
	}

	return result.map((workout) => {
		const { exercisesSerial } = workout;

		return {
			...workout,
			exercisesSerial: decodeStringsToExercises(exercisesSerial),
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
		exercisesSerial: decodeStringsToExercises(result.exercisesSerial),
	};
}
