"use server";

import {
	createExercise as createExerciseAction,
	deleteExercise as deleteExerciseAction,
	getExercises as getExercisesAction,
	updateExercise as updateExerciseAction,
} from "../actions/exercises";
import {
	createUser as createUserAction,
	deleteCurrentUser as deleteCurrentUserAction,
	getCurrentUser as getCurrentUserAction,
} from "../actions/user";
import {
	createWorkoutByUser as createWorkoutForUserAction,
	getWorkout as getWorkoutByIdAction,
	getWorkouts as getWorkoutsAction,
	getWorkoutsInRange as getWorkoutsInRangeAction,
	getWorkoutsSince as getWorkoutsSinceAction,
} from "../actions/workouts";
import { saveWorkoutLifting as saveWorkoutLiftingAction } from "../actions/workouts/log-workout";

// USER ACTIONS
export const createUser = createUserAction;
export const getCurrentUser = getCurrentUserAction;
export const deleteCurrentUser = deleteCurrentUserAction;

// EXERCISE ACTIONS
export const createExercise = createExerciseAction;
export const getExercises = getExercisesAction;
export const updateExercise = updateExerciseAction;
export const deleteExercise = deleteExerciseAction;

// WORKOUT ACTIONS
export const createWorkoutForUser = createWorkoutForUserAction;
export const getWorkouts = getWorkoutsAction;
export const getWorkoutsSince = getWorkoutsSinceAction;
export const getWorkoutsInRange = getWorkoutsInRangeAction;
export const getWorkoutById = getWorkoutByIdAction;

export const saveWorkoutLifting = saveWorkoutLiftingAction;
