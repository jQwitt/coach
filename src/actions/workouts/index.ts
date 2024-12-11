"use server";

import { getWorkoutsByUser } from "@/db/workouts";
import { getCurrentUser } from "../user";

export const getWorkouts = async () => {
	const { id } = (await getCurrentUser()) ?? {};

	if (!id) {
		console.log("No user found!");
		return [];
	}

	const result = await getWorkoutsByUser({ userId: id });

	return result;
};
