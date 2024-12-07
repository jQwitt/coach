import type { WorkoutLiftingData } from "@/lib/types";

export const getRepsPerExercise = (
	workout: Omit<WorkoutLiftingData, "date">,
): Array<{ index: number; reps: number }> => {
	return workout.exercisesSerial.map((exercise, index) => {
		const { sets } = exercise;
		const reps = sets.reduce((acc, { count, reps }) => acc + count * reps, 0);

		return { index, reps };
	});
};

export const getSetsPerExercise = (
	workout: Omit<WorkoutLiftingData, "date">,
): Array<{ index: number; sets: number }> => {
	return workout.exercisesSerial.map(({ sets }, index) => ({
		index,
		sets: sets.reduce((acc, { count }) => acc + count, 0),
	}));
};
