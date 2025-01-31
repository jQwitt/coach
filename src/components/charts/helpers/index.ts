import type { ExerciseData } from "@/lib/types";

export const format = (exercises: ExerciseData[]) => {
	const result = [];

	for (const exercise of exercises) {
		const { name, sets } = exercise;
		const current = { name, reps: 0, maxWeight: 0, sets: 0 };
		for (const { count, reps, weight } of sets) {
			current.reps = Math.max(current.reps, reps);
			current.maxWeight = Math.max(current.maxWeight, weight);
			current.sets += count;
		}
		result.push(current);
	}

	return result;
};
