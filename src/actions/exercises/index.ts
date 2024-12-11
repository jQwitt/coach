import { getCurrentUser } from "@/app/actions";
import { getExercisesByUser } from "@/db/exercises";

export async function getExercises() {
	const user = await getCurrentUser();

	if (user?.id) {
		return await getExercisesByUser({ userId: user.id });
	}

	return [];
}
