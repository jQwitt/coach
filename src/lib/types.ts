import type { getDetailedWorkoutsForDates, getExercises } from "@/app/actions";
import type schema from "@/db/schema";

export type User = typeof schema.users_table.$inferSelect;
export type UserTag = typeof schema.user_tag_table.$inferSelect;
export type UserExerciseLifting = typeof schema.user_lifting_exercises_table.$inferSelect;
export type WorkoutLiftingExercise = typeof schema.workouts_lifting_exercises_table.$inferSelect;
export type WorkoutLifting = typeof schema.workouts_lifting_table.$inferSelect;
export type MuscleGroups = "Arms" | "Shoulders" | "Chest" | "Back" | "Legs" | "Core" | "FullBody";
export type MusclesDetailed =
	| "Biceps Long"
	| "Biceps Short"
	| "Biceps Brachii"
	| "Anterior Deltoid"
	| "Medial Deltoid"
	| "Posterior Deltoid"
	| "Triceps Long"
	| "Triceps Short"
	| "Triceps Medial"
	| "Trapezius"
	| "Latissimus Dorsi"
	| "Pectoralis"
	| "Abdominal"
	| "Obliques"
	| "Quads"
	| "Hamstrings"
	| "Calves"
	| "Glutes";

// Client Data Types
export type WorkoutLiftingData = {
	name: string;
	exercises: ExerciseData[];
};
export type ExerciseData = {
	name: string;
	sets: ExerciseSetData[];
	primaryTarget: MuscleGroups;
	detailedTargets: MusclesDetailed[];
};
export type ExerciseSetData = {
	count: number;
	reps: number;
	weight: number;
	metadata: ExerciseSetMetadata;
};
export type ExerciseSetMetadata = {
	toFailure?: boolean;
	unilateral?: boolean;
};

export type WorkoutLiftingExerciseData = Omit<
	WorkoutLiftingExercise,
	"userId" | "workoutId" | "exerciseId"
> & { name: string | null };

export type WorkoutVolume = {
	count: number;
	totalSets: number;
	totalReps: number;
};

export type WorkoutAnalytics = {
	currentVolume: WorkoutVolume;
	previousVolume?: WorkoutVolume;
	increment: TimeSpan | null;
};

export const SupportedTimeSpans = {
	day: "day",
	week: "week",
	month: "month",
	year: "year",
	"all-time": "all-time",
};
export type TimeSpan = keyof typeof SupportedTimeSpans;

export type ExerciseHistory = {
	timeCompleted: string | null;
	totalSets: number;
	totalReps: number;
	maxWeight: string;
}[];

export type ExercisesReturn = Awaited<ReturnType<typeof getExercises>>;
export type WorkoutsDetailedByDateReturn = Awaited<ReturnType<typeof getDetailedWorkoutsForDates>>;

export type MessageDirection = "inbound" | "outbound";
export type LiceCoachConversationMessage = {
	direction: MessageDirection;
	text: string;
	info?: LiveCoachConversationMessageInfo;
};
export type LiveCoachConversationMessageInfo = {
	title: string;
	description: string;
	data: string;
};

export enum LiveCoachConversationPhase {
	DETETMINE_INTENT = "determine_intent",
	CONFIRM_INTENT = "confirm_intent",
	FULFILL_INTENT = "fulfill_intent",
	END_CONVERSATION = "end_conversation",
}
export enum LiveCoachSupportedActionsEnum {
	DESIGN_WORKOUT = "design a workout",
	VIEW_ANALYTICS = "view analytics",
	SUGGEST_EXERCISE = "suggest an exercise",
	DETERMINE_EXERCISE_WEIGHT = "determine exercise weight",
}
export const LiveCoachSupportedActions = (
	Object.keys(LiveCoachSupportedActionsEnum) as Array<keyof typeof LiveCoachSupportedActionsEnum>
).map((key) => ({ value: key, key: LiveCoachSupportedActionsEnum[key] }));
