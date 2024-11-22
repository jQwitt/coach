import { create } from "zustand";

import { Exercise, ExerciseSet, WorkoutLiftingData } from "@/lib/types";

interface WorkoutState {
  workout: WorkoutLiftingData;
  setWorkoutName: (name: string) => void;
  addExercise: (exercise?: Exercise) => void;
  removeExercise: (index: number) => void;
  updateExerciseName: (index: number, name: string) => void;
  addSetToExercise: (index: number) => void;
  removeSetFromExercise: (index: number) => void;
  updateExerciseSets: (
    index: number,
    setIndex: number,
    values: Partial<ExerciseSet>
  ) => void;
}

const initialSet = {
  reps: 0,
  weight: 0,
  metadata: {},
} satisfies ExerciseSet;

const initialExercise = {
  name: "Add Exercise Name",
  sets: [{ ...initialSet }],
} satisfies Exercise;

const initialWorkout = {
  name: "",
  exercises: [{ ...initialExercise }],
} satisfies WorkoutLiftingData;

const useWorkoutStore = create<WorkoutState>()(
  (set) =>
    ({
      workout: initialWorkout,
      setWorkoutName: (name) => {
        set((state) => ({
          workout: {
            ...state.workout,
            name,
          },
        }));
      },

      // EXERCISE
      addExercise: (exercise) => {
        set((state) => {
          const exercises = [
            ...state.workout.exercises.map((e) => ({
              ...e,
              sets: [...e.sets.map((s) => ({ ...s }))],
            })),
            exercise ?? initialExercise,
          ];

          return {
            workout: {
              ...state.workout,
              exercises,
            },
          };
        });
      },
      removeExercise: (index: number) => {
        set((state) => {
          const exercises = [...(state.workout.exercises ?? [])];
          exercises.splice(index, 1);

          return {
            workout: {
              ...state.workout,
              exercises,
            },
          };
        });
      },
      updateExerciseName: (index: number, name: string) => {
        set((state) => {
          const exercises = [...(state.workout.exercises ?? [])];

          if (index < 0 || index >= exercises.length) {
            return state;
          }

          exercises[index].name = name;

          return {
            workout: {
              ...state.workout,
              exercises,
            },
          };
        });
      },

      // SETS
      addSetToExercise: (index: number) => {
        set((state) => {
          const exercises = [...(state.workout.exercises ?? [])];

          if (index < 0 || index >= exercises.length) {
            return state;
          }

          exercises[index].sets.push({ ...initialSet });

          return {
            workout: {
              ...state.workout,
              exercises,
            },
          };
        });
      },
      removeSetFromExercise: (index: number) => {
        set((state) => {
          const exercises = [...(state.workout.exercises ?? [])];

          if (index < 0 || index >= exercises.length) {
            return state;
          }

          const exercise = exercises[index];
          exercise.sets.pop();

          return {
            workout: {
              ...state.workout,
              exercises,
            },
          };
        });
      },
      updateExerciseSets: (
        index: number,
        setIndex: number,
        values: Partial<ExerciseSet>
      ) => {
        set((state) => {
          const exercises = [...(state.workout.exercises ?? [])];

          if (index < 0 || index >= exercises.length) {
            return state;
          }

          const exercise = exercises[index];

          if (setIndex < 0 || setIndex >= exercise.sets.length) {
            return state;
          }

          const sets = exercise.sets[setIndex];
          exercise.sets[setIndex] = {
            ...sets,
            ...values,
          };

          return {
            workout: {
              ...state.workout,
              exercises,
            },
          };
        });
      },
    }) satisfies WorkoutState
);

export default useWorkoutStore;