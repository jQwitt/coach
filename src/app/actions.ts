"use server";

import { getExercises as getExercisesAction } from "../actions/exercises";
import {
	createUser as createUserAction,
	deleteCurrentUser as deleteCurrentUserAction,
	getCurrentUser as getCurrentUserAction,
} from "../actions/user";
import { getWorkouts as getWorkoutsAction } from "../actions/workouts";
import { saveWorkoutLifting as saveWorkoutLiftingAction } from "../actions/workouts/log-workout";

// USER ACTIONS
export const createUser = createUserAction;
export const getCurrentUser = getCurrentUserAction;
export const deleteCurrentUser = deleteCurrentUserAction;

// EXERCISE ACTIONS
export const getExercises = getExercisesAction;

// WORKOUT ACTIONS
export const getWorkouts = getWorkoutsAction;

export const saveWorkoutLifting = saveWorkoutLiftingAction;
