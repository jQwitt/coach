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

export type WorkoutAnalytics = {
	count: number;
	totalSets: number;
	totalReps: number;
	week: {
		count: number;
		totalSets: number;
		totalReps: number;
	};
};
