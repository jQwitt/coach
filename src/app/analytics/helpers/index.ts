import type { WorkoutLiftingData } from "@/lib/types";

export const getWorkoutStatistics = (workouts: WorkoutLiftingData[]) => {
	const result = {
		totalWorkouts: workouts.length,
		totalSets: 0,
		totalReps: 0,
	};

	for (const workout of workouts) {
		const { exercises } = workout;

		for (const exercise of exercises) {
			for (const set of exercise.sets) {
				result.totalSets += set.count;
				result.totalReps += set.reps;
			}
		}
	}

	return result;
};
