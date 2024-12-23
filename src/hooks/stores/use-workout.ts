import { create } from "zustand";

import type { ExerciseData, ExerciseSetData, MuscleGroups, WorkoutLiftingData } from "@/lib/types";
import { hasForbiddenCharacters } from "@/lib/utils";

interface WorkoutState {
	workout: Omit<WorkoutLiftingData, "date">;
	reset: () => void;
	setWorkoutName: (name: string) => void;
	addEmptyExercise: () => void;
	removeExercise: (index: number) => void;
	updateExerciseName: (index: number, name: string) => void;
	updateExercisePrimaryTarget: (index: number, target: MuscleGroups) => void;
	addSetToExercise: (index: number) => void;
	removeSetFromExercise: (index: number) => void;
	updateExerciseSets: (index: number, setIndex: number, values: Partial<ExerciseSetData>) => void;
}

const initialSet = {
	count: 1,
	reps: 0,
	weight: 0,
	metadata: {},
} satisfies ExerciseSetData;

const initialExercise = {
	name: "",
	sets: [{ ...initialSet }],
	primaryTarget: "FullBody",
	detailedTargets: [],
} satisfies ExerciseData;

const initialWorkout = {
	name: "",
	exercises: [{ ...initialExercise }],
} satisfies WorkoutLiftingData;

const useWorkoutStore = create<WorkoutState>()(
	(set) =>
		({
			workout: initialWorkout,
			reset: () => {
				set({
					workout: {
						...initialWorkout,
						exercises: [{ ...initialExercise, sets: [{ ...initialSet }] }],
					},
				});
			},
			setWorkoutName: (name: string) => {
				set((state) => {
					if (hasForbiddenCharacters(name)) {
						return state;
					}
					return {
						workout: {
							...state.workout,
							name,
						},
					};
				});
			},

			// EXERCISE
			addEmptyExercise: () => {
				set((state) => {
					const toAdd = { ...initialExercise, sets: [{ ...initialSet }] } satisfies ExerciseData;
					const exercises = [
						...state.workout.exercises.map((e) => ({
							...e,
							sets: [...e.sets.map((s) => ({ ...s }))],
						})),
						toAdd,
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
					if (hasForbiddenCharacters(name)) {
						return state;
					}

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
			updateExercisePrimaryTarget(index, target) {
				set((state) => {
					const exercises = [...(state.workout.exercises ?? [])];

					if (index < 0 || index >= exercises.length) {
						return state;
					}

					exercises[index].primaryTarget = target;

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
			updateExerciseSets: (index: number, setIndex: number, values: Partial<ExerciseSetData>) => {
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
		}) satisfies WorkoutState,
);

export default useWorkoutStore;
