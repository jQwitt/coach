import { getCurrentUser } from "@/app/actions";
import { getExercisesByUser, getExercisesByWorkoutId } from "@/db/exercises";

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
