"use server";

import {
	createUser as createUserAction,
	deleteCurrentUser as deleteCurrentUserAction,
	getCurrentUser as getCurrentUserAction,
} from "../actions/user";
import {
	addKnownExerciseForUser as addKnownExerciseForUserAction,
	getExerciseNames as getExerciseNamesAction,
} from "../actions/user/exerciseNames";
import {
	createWorkoutByUser as createWorkoutForUserAction,
	getWorkout as getWorkoutByIdAction,
	getWorkouts as getWorkoutsAction,
	getWorkoutsSince as getWorkoutsSinceAction,
} from "../actions/workouts";

// USER ACTIONS
export const createUser = createUserAction;
export const getCurrentUser = getCurrentUserAction;
export const deleteCurrentUser = deleteCurrentUserAction;
export const addKnownExerciseForUser = addKnownExerciseForUserAction;
export const getKnownExercisesForUser = getExerciseNamesAction;

// WORKOUT ACTIONS
export const createWorkoutForUser = createWorkoutForUserAction;
export const getWorkouts = getWorkoutsAction;
export const getWorkoutsSince = getWorkoutsSinceAction;
export const getWorkoutById = getWorkoutByIdAction;
