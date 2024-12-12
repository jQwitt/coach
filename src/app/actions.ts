"use server";

import {
	getExercises as getExercisesAction,
	getExercisesForWorkout as getExercisesForWorkoutAction,
} from "../actions/exercises";
import {
	createUser as createUserAction,
	deleteCurrentUser as deleteCurrentUserAction,
	getCurrentUser as getCurrentUserAction,
} from "../actions/user";
import {
	getWorkout as getWorkoutAction,
	getWorkouts as getWorkoutsAction,
} from "../actions/workouts";
import { saveWorkoutLifting as saveWorkoutLiftingAction } from "../actions/workouts/log-workout";

// USER ACTIONS
export const createUser = createUserAction;
export const getCurrentUser = getCurrentUserAction;
export const deleteCurrentUser = deleteCurrentUserAction;

// EXERCISE ACTIONS
export const getExercises = getExercisesAction;
export const getExercisesForWorkout = getExercisesForWorkoutAction;

// WORKOUT ACTIONS
export const getWorkouts = getWorkoutsAction;
export const getWorkout = getWorkoutAction;

export const saveWorkoutLifting = saveWorkoutLiftingAction;
