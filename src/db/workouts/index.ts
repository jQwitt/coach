import db from "..";

export async function getWorkoutsByUser({ userId }: { userId: number }) {
	const workouts = await db.query.workouts_lifting_table.findMany({
		where: (workouts, { eq }) => eq(workouts.userId, userId),
		orderBy: (workouts, { desc }) => desc(workouts.timeCompleted),
	});

	if (!workouts) {
		console.log(`No workouts for user: ${userId}!`);
		return [];
	}

	return workouts;
}

export async function getWorkoutById({ userId, id }: { userId: number; id: number }) {
	const result = await db.query.workouts_lifting_table.findFirst({
		where: (workouts, { eq, and }) => and(eq(workouts.userId, userId), eq(workouts.id, id)),
	});

	if (!result) {
		console.log(`No workout with id: ${id}!`);
		return null;
	}

	return result;
}
