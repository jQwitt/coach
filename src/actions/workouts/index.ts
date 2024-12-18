"use server";

import { toEndOfDay, toStartOfDay } from "@/app/analytics/helpers/date-ranges";
import {
	getWorkoutById,
	getWorkoutsByUser,
	getWorkoutsWithExercisesByUserForDateRange,
} from "@/db/workouts";
import { getCurrentUser } from "../user";

export async function getWorkouts() {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId) {
		return [];
	}

	return await getWorkoutsByUser({ userId });
}

export async function getDetailedWorkoutsForDates({
	startDate,
	endDate,
}: { startDate: string; endDate: string }) {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId) {
		return [];
	}

	const start = toStartOfDay(startDate);
	const end = toEndOfDay(endDate);

	return await getWorkoutsWithExercisesByUserForDateRange({
		userId,
		start,
		end,
	});
}

export async function getWorkout({ workoutId }: { workoutId: string }) {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId) {
		return null;
	}

	return await getWorkoutById({ userId, id: Number(workoutId) });
}
