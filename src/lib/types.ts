import type schema from "@/db/schema";

export type User = typeof schema.users_table.$inferSelect;
export type UserTag = typeof schema.user_tag_table.$inferSelect;
export type UserExerciseLifting = typeof schema.user_lifting_exercises_table.$inferSelect;
export type WorkoutLifting = typeof schema.workouts_lifting_table.$inferSelect;

// Client Data Types
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

export type WorkoutLiftingData = Omit<WorkoutLifting, "id" | "userId" | "exercisesSerial"> & {
	exercisesSerial: ExerciseData[];
};

export type WorkoutLiftingDataWithID = Omit<WorkoutLifting, "userId" | "exercisesSerial"> & {
	exercisesSerial: ExerciseData[];
};
