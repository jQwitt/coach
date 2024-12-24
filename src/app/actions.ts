"use server";

import {
	createExercise as createExerciseAction,
	getExercise as getExerciseAction,
	getExerciseHistory as getExerciseHistoryAction,
	getExercises as getExercisesAction,
	getExercisesForWorkout as getExercisesForWorkoutAction,
	updateExercise as updateExerciseAction,
} from "../actions/exercises";
import { determineTrainingIntent as determineTrainingIntentAction } from "../actions/live-coach";
import {
	createUser as createUserAction,
	deleteCurrentUser as deleteCurrentUserAction,
	getCurrentUser as getCurrentUserAction,
} from "../actions/user";
import {
	getDetailedWorkoutsForDates as getDetailedWorkoutsForDatesAction,
	getPreviousDetailedWorkoutsByIncrement as getPreviousDetailedWorkoutsByIncrementAction,
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
export const getExercise = getExerciseAction;
export const getExercisesForWorkout = getExercisesForWorkoutAction;
export const createExercise = createExerciseAction;
export const updateExercise = updateExerciseAction;
export const getExerciseHistory = getExerciseHistoryAction;

// WORKOUT ACTIONS
export const getWorkouts = getWorkoutsAction;
export const getDetailedWorkoutsForDates = getDetailedWorkoutsForDatesAction;
export const getPreviousDetailedWorkoutsByIncrement = getPreviousDetailedWorkoutsByIncrementAction;
export const getWorkout = getWorkoutAction;
export const saveWorkoutLifting = saveWorkoutLiftingAction;

// LIVE COACH
export const determineTrainingIntent = determineTrainingIntentAction;
