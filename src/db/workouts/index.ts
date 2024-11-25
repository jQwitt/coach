import type { WorkoutLifting } from "@/lib/types";
import db from "..";
import schema from "../schema";

export const getWorkoutsByUser = async ({ id }: { id: number }) => {
	const workouts = await db.query.workouts_lifting_table.findMany({
		where: (workouts, { eq }) => eq(workouts.userId, id),
	});

	if (!workouts) {
		console.log(`No workouts for user: ${id}!`);
		return [];
	}

	return workouts;
};

export const createWorkoutForUser = async ({
	data,
}: {
	data: Omit<WorkoutLifting, "id">;
}) => {
	const userId = data.userId;
	const result = await db
		.insert(schema.workouts_lifting_table)
		.values({
			...data,
			userId,
		})
		.returning();

	if (!result.length) {
		console.log(`error creating workout for user ${userId}`);
		return false;
	}

	return true;
};
