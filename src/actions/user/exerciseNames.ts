"use server";

import { getExerciseNamesByUser, insertAppendExerciseNameToUser } from "@/db/users";

export async function getExerciseNames({ userId }: { userId: number }) {
	const names = await getExerciseNamesByUser({ userId });

	return names?.exerciseNames ?? [];
}

export async function addKnownExerciseForUser({ userId, name }: { userId: number; name: string }) {
	const knownExercises = await getExerciseNamesByUser({ userId });

	if (!knownExercises?.exerciseNames) {
		console.log("error getting user exerciseNames!");
		return [];
	}

	if (knownExercises.exerciseNames.includes(name)) {
		return knownExercises.exerciseNames;
	}

	const result = await insertAppendExerciseNameToUser({ userId, exerciseName: name });

	if (!result) {
		console.log("error updating user exerciseNames!");
		return knownExercises.exerciseNames ?? [];
	}

	return result;
}
