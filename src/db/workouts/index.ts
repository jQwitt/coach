import type { WorkoutLifting } from "@/lib/types";
import db from "..";
import schema from "../schema";

export const getWorkoutsByUser = async ({ id }: { id: number }) => {
	const workouts = await db.query.workouts_lifting_table.findMany({
		where: (workouts, { eq }) => eq(workouts.userId, id),
		orderBy: (workouts, { desc }) => desc(workouts.date),
	});

	if (!workouts) {
		console.log(`No workouts for user: ${id}!`);
		return [];
	}

	return workouts;
};

export async function getWorkouts({
	userId,
	start,
	end,
}: {
	userId: number;
	start: string;
	end: string;
}) {
	const result = await db.query.workouts_lifting_table.findMany({
		where: (workouts, { and, gte, lte, eq }) =>
			and(gte(workouts.date, start), lte(workouts.date, end), eq(workouts.userId, userId)),
	});

	if (!result) {
		console.log(`No workouts within the timeframe for user: ${userId}!`);
		return [];
	}

	return result;
}

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

export async function getWorkoutById({ id }: { id: number }) {
	const result = await db.query.workouts_lifting_table.findFirst({
		where: (workouts, { eq }) => eq(workouts.id, id),
	});

	if (!result) {
		console.log(`No workout with id: ${id}!`);
		return null;
	}

	return result;
}
