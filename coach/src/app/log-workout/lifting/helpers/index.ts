import { WorkoutLiftingData } from "@/lib/types";

export const getRepsPerExercise = (workout: WorkoutLiftingData): Object[] => {
  return workout.exercises.map((exercise, index) => {
    const { sets } = exercise;
    const reps = sets.reduce((acc, set) => acc + set.reps, 0);

    return { index, reps };
  });
};

export const getSetsPerExercise = (workout: WorkoutLiftingData): Object[] => {
  return workout.exercises.map(({ sets }, index) => ({
    index,
    sets: sets.length,
  }));
};
