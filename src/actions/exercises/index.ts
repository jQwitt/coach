import { getCurrentUser } from "@/app/actions";
import {
	createExerciseForUser,
	getExerciseHistoryForUser,
	getExercisesByUser,
	getExercisesByWorkoutId,
	updateExerciseForUser,
} from "@/db/exercises";
import type { UserExerciseLifting } from "@/lib/types";

export async function getExercises() {
	const user = await getCurrentUser();

	if (user?.id) {
		return await getExercisesByUser({ userId: user.id });
	}

	return [];
}

export async function getExercisesForWorkout({ workoutId }: { workoutId: string }) {
	const user = await getCurrentUser();

	if (user?.id) {
		return await getExercisesByWorkoutId({ userId: user.id, workoutId: Number(workoutId) });
	}

	return [];
}

export async function createExercise({
	data,
}: { data: Omit<UserExerciseLifting, "id" | "userId"> }) {
	const user = await getCurrentUser();

	if (user?.id) {
		return await createExerciseForUser({ userId: user.id, data });
	}

	return false;
}

export async function updateExercise({
	exerciseId,
	data,
}: { exerciseId: string; data: Partial<UserExerciseLifting> }) {
	const user = await getCurrentUser();

	if (user?.id && Number.isSafeInteger(Number(exerciseId))) {
		return await updateExerciseForUser({ userId: user.id, exerciseId: Number(exerciseId), data });
	}

	return false;
}

export async function getExerciseHistory({ exerciseId }: { exerciseId: string }) {
	const user = await getCurrentUser();

	if (user?.id && Number.isSafeInteger(Number(exerciseId))) {
		return await getExerciseHistoryForUser({ userId: user.id, exerciseId: Number(exerciseId) });
	}

	return [];
}
