"use server";

import {
	createExercise as createExerciseAction,
	getExercise as getExerciseAction,
	getExerciseHistory as getExerciseHistoryAction,
	getExercises as getExercisesAction,
	getExercisesForWorkout as getExercisesForWorkoutAction,
	updateExercise as updateExerciseAction,
} from "../actions/exercises";
import {
	designWorkout as designWorkoutAction,
	determineExerciseWeight as determineExerciseWeightAction,
	determineTrainingIntent as determineTrainingIntentAction,
	suggestExercise as suggestExerciseAction,
	viewAnalytics as viewAnalyticsAction,
} from "../actions/live-coach";
import {
	getSubscriptionPlan as getSubscriptionPlanAction,
	getSubscriptionPlanForCurrentUser as getSubscriptionPlanForCurrentUserAction,
	isConversationLimitReached as isConversationLimitReachedAction,
	logConversation as logConversationAction,
} from "../actions/subscription-plans";
import {
	createUser as createUserAction,
	deleteCurrentUser as deleteCurrentUserAction,
	emailExists as emailExistsAction,
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
export const isRegistered = emailExistsAction;

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
export const designWorkout = designWorkoutAction;
export const determineExerciseWeight = determineExerciseWeightAction;
export const suggestExercise = suggestExerciseAction;
export const viewAnalytics = viewAnalyticsAction;

// PLANS
export const getSubscriptionPlan = getSubscriptionPlanAction;
export const getSubscriptionPlanForCurrentUser = getSubscriptionPlanForCurrentUserAction;
export const logConversation = logConversationAction;
export const isConversationLimitReached = isConversationLimitReachedAction;
