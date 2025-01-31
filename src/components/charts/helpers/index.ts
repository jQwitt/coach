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

export const getVolumeFor = (data: ReturnType<typeof format>) => {
	const result = {
		totalSets: 0,
		totalReps: 0,
		max: {
			sets: 0,
			reps: 0,
		},
	};

	for (const { sets, reps } of data) {
		result.totalSets += sets;
		result.totalReps += reps;

		result.max.sets = Math.max(sets, result.max.sets);
		result.max.reps = Math.max(reps, result.max.reps);
	}

	return result;
};
