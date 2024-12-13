import type { WorkoutLiftingData } from "@/lib/types";
export const getRepsPerExercise = (
	exercises: WorkoutLiftingData["exercises"],
): Array<{ index: number; reps: number }> => {
	return exercises.map((exercise, index) => {
		const { sets } = exercise;
		const reps = sets.reduce((acc, { count, reps }) => acc + count * reps, 0);
		return { index, reps };
	});
};
export const getSetsPerExercise = (
	exercises: WorkoutLiftingData["exercises"],
): Array<{ index: number; sets: number }> => {
	return exercises.map(({ sets }, index) => ({
		index,
		sets: sets.reduce((acc, { count }) => acc + count, 0),
	}));
};
