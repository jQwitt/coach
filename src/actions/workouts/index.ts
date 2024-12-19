"use server";

import { offset, toEndOfDay, toStartOfDay } from "@/app/analytics/helpers/date-ranges";
import {
	getWorkoutById,
	getWorkoutsByUser,
	getWorkoutsWithExercisesByUserForDateRange,
} from "@/db/workouts";
import type { TimeSpan } from "@/lib/types";
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

export async function getPreviousDetailedWorkoutsByIncrement({
	startDate,
	endDate,
	increment,
}: { startDate: string; endDate: string; increment: TimeSpan | null }) {
	const { id: userId } = (await getCurrentUser()) ?? {};

	if (!userId || !increment || increment === "all-time") {
		return [];
	}

	const start = offset(new Date(toStartOfDay(startDate)), increment as TimeSpan).toISOString();
	const end = offset(new Date(toEndOfDay(endDate)), increment as TimeSpan).toISOString();

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
