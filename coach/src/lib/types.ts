import schema from "@/db/schema";

export type User = typeof schema.usersTable.$inferSelect;
export type WorkoutLifting = typeof schema.workouts_lifting_table.$inferSelect;

export type Exercise = {
  name: string;
  sets: ExerciseSet[];
};

export type ExerciseSet = {
  reps: number;
  weight: number;
  metadata: ExerciseSetMetadata;
};

export type ExerciseSetMetadata = {
  toFailure?: boolean;
  unilateral?: boolean;
};
