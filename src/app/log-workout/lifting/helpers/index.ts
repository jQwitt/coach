import type { WorkoutLiftingDataWithoutDate } from "@/lib/types";

export const getRepsPerExercise = (
	workout: WorkoutLiftingDataWithoutDate,
): Array<{ index: number; reps: number }> => {
	return workout.exercises.map((exercise, index) => {
		const { sets } = exercise;
		const reps = sets.reduce((acc, { count, reps }) => acc + count * reps, 0);

		return { index, reps };
	});
};

export const getSetsPerExercise = (
	workout: WorkoutLiftingDataWithoutDate,
): Array<{ index: number; sets: number }> => {
	return workout.exercises.map(({ sets }, index) => ({
		index,
		sets: sets.reduce((acc, { count }) => acc + count, 0),
	}));
};
