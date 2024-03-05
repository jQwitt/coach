import { create } from "zustand";

import { Exercise, Set, Workout } from "@/types";

interface WorkoutStore extends Workout {
  addExercise: (exercise: Exercise) => void;
  addSetForExercise: (name: String, data: Set) => void;
}

export const useWorkoutStore = create<WorkoutStore>()((set) => ({
  date: new Date(),
  exercises: [],
  notes: "",
  addExercise: (exercise) =>
    set((state) => ({ ...state, exercises: [...state.exercises, exercise] })),
  addSetForExercise: (name, data) =>
    set((state) => {
      const current = state.exercises.find(
        (exercise) => exercise.name === name
      );

      if (current) current.sets.push(data);

      return { ...state };
    }),
}));
