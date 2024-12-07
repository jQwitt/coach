import { getCurrentUser } from "@/app/actions";
import {
	createExerciseForUser,
	deleteExerciseForUser,
	getExercisesByUser,
	updateExerciseForUser,
} from "@/db/exercises";
import type { UserExerciseLifting } from "@/lib/types";

export async function createExercise(name: string) {
	const user = await getCurrentUser();

	if (user?.id) {
		return await createExerciseForUser({ userId: user.id, name });
	}

	return false;
}

export async function getExercises() {
	const user = await getCurrentUser();

	if (user?.id) {
		return await getExercisesByUser({ userId: user.id });
	}

	return [];
}

export async function updateExercise(data: Omit<UserExerciseLifting, "userId">) {
	const user = await getCurrentUser();

	if (user?.id) {
		return await updateExerciseForUser({ ...data, userId: user.id });
	}

	return false;
}

export async function deleteExercise(id: number) {
	const user = await getCurrentUser();

	if (user?.id) {
		return await deleteExerciseForUser({ id, userId: user.id });
	}

	return false;
}
