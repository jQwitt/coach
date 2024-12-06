import type schema from "@/db/schema";

export type User = typeof schema.users_table.$inferSelect;
export type UserTag = typeof schema.user_tag_table.$inferSelect;
export type WorkoutLifting = typeof schema.workouts_lifting_table.$inferSelect;

export type Exercise = {
	name: string;
	sets: ExerciseSet[];
};

export type ExerciseSet = {
	count: number;
	reps: number;
	weight: number;
	metadata: ExerciseSetMetadata;
};

export type ExerciseSetMetadata = {
	toFailure?: boolean;
	unilateral?: boolean;
};

export type WorkoutLiftingData = Omit<WorkoutLifting, "id" | "userId" | "exercises"> & {
	exercises: Exercise[];
};

export type WorkoutLiftingDataWithID = Omit<WorkoutLifting, "userId" | "exercisesSerial"> & {
	exercisesSerial: Exercise[];
};

export type WorkoutLiftingDataWithoutDate = Omit<WorkoutLiftingData, "date">;
