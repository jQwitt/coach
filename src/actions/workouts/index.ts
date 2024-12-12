"use server";

import { getWorkoutById, getWorkoutsByUser } from "@/db/workouts";
import { getCurrentUser } from "../user";

export async function getWorkouts() {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId) {
		return [];
	}

	return await getWorkoutsByUser({ userId });
}

export async function getWorkout({ workoutId }: { workoutId: string }) {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId) {
		return null;
	}

	return await getWorkoutById({ userId, id: Number(workoutId) });
}
