"use server";

import {
	getVolumeSinceDate,
	getWorkoutById,
	getWorkoutsByUser,
	getWorkoutsWithExercisesByUserSinceDate,
} from "@/db/workouts";
import { getCurrentUser } from "../user";

export async function getWorkouts() {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId) {
		return [];
	}

	return await getWorkoutsByUser({ userId });
}

export async function getWorkoutsWithExercises() {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId) {
		return [];
	}

	const date = new Date("1970").toISOString();

	return await getWorkoutsWithExercisesByUserSinceDate({ userId, date });
}

export async function getWorkoutsWithExercisesSince({ date }: { date: string }) {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId) {
		return [];
	}

	return await getWorkoutsWithExercisesByUserSinceDate({ userId, date });
}

export async function getVolumeSince({ startDate }: { startDate: string }) {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId) {
		return [];
	}

	return await getVolumeSinceDate({ userId });
}

export async function getWorkout({ workoutId }: { workoutId: string }) {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId) {
		return null;
	}

	return await getWorkoutById({ userId, id: Number(workoutId) });
}
