import "dotenv/config";
import type { MuscleGroups, MusclesDetailed } from "@/lib/types";
import { and, eq, gte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { lifting_exercises_table } from "./schema/exercises";
import { users_table } from "./schema/users";
import { workouts_lifting_exercises_table, workouts_lifting_table } from "./schema/workouts";

async function main() {
	const db = drizzle();

	const user: typeof users_table.$inferInsert = {
		authId: "user.9999999",
		firstName: "Test",
		lastName: "Testerson",
		email: "test@test.com",
	};

	const insertUserResult = await db.insert(users_table).values(user).returning();
	const { id: userId } = insertUserResult[0];
	if (!userId) {
		return;
	}
	console.log("New user created!");

	const users = await db.select().from(users_table);
	console.log("Getting all users from the database: ", users);

	await db
		.update(users_table)
		.set({
			email: "tested@updated.com",
		})
		.where(eq(users_table.email, user.email));
	console.log("User info updated!");

	const exerciseA: typeof lifting_exercises_table.$inferInsert = {
		name: "Lat Pull Down",
		userId,
		primaryTarget: "Back" satisfies MuscleGroups,
		detailedTargets: ["Latissimus Dorsi"] satisfies MusclesDetailed[],
	};
	const exerciseB: typeof lifting_exercises_table.$inferInsert = {
		name: "Bench Press",
		userId,
		primaryTarget: "Chest" satisfies MuscleGroups,
		detailedTargets: ["Pectoralis"] satisfies MusclesDetailed[],
	};

	const insertExercisesResult = await db
		.insert(lifting_exercises_table)
		.values([exerciseA, exerciseB])
		.returning();
	const { id: exerciseAId } = insertExercisesResult[0];
	const { id: exerciseBId } = insertExercisesResult[1];
	if (!exerciseAId || !exerciseBId) {
		return;
	}
	console.log("New exercises created!");

	const now = new Date().toISOString();
	const workout: typeof workouts_lifting_table.$inferInsert = {
		date: now,
		name: "New Workout",
		userId,
		timeStarted: now,
		timeCompleted: now,
		duration: "0h 0m",
	};

	const insertWorkoutResult = await db.insert(workouts_lifting_table).values(workout).returning();
	const { id: workoutId } = insertWorkoutResult[0];
	if (!workoutId) {
		return;
	}
	console.log("New workout created!");

	const insertExercisesForWorkout = await db
		.insert(workouts_lifting_exercises_table)
		.values([
			{
				workoutId,
				exerciseId: exerciseAId,
				userId,
				totalReps: 10,
				totalSets: 3,
				maxWeight: "100",
				serializedSetData: ["data A"],
			},
			{
				workoutId,
				exerciseId: exerciseBId,
				userId,
				totalReps: 10,
				totalSets: 3,
				maxWeight: "200",
				serializedSetData: ["data B"],
			},
		])
		.returning();
	const exerciseAInsertResult = insertExercisesForWorkout[0];
	const exerciseBInsertResult = insertExercisesForWorkout[1];
	if (!exerciseAInsertResult || !exerciseBInsertResult) {
		return;
	}
	console.log("Exercise A and B added to workout!");

	const workoutSummary = await db
		.select()
		.from(workouts_lifting_table)
		.where(eq(workouts_lifting_table.id, workoutId));
	const workoutSummaryExercises = await db
		.select({
			workoutId: workouts_lifting_exercises_table.workoutId,
			exerciseId: workouts_lifting_exercises_table.exerciseId,
			exerciseName: lifting_exercises_table.name,
			data: workouts_lifting_exercises_table.serializedSetData,
		})
		.from(workouts_lifting_exercises_table)
		.where(eq(workouts_lifting_exercises_table.workoutId, workoutId))
		.leftJoin(
			lifting_exercises_table,
			eq(workouts_lifting_exercises_table.exerciseId, lifting_exercises_table.id),
		);

	console.log("Here is a workout summary from the database:");
	console.log(workoutSummary);
	console.log(workoutSummaryExercises);

	const exerciseAforUser = await db
		.select()
		.from(lifting_exercises_table)
		.where(
			and(eq(lifting_exercises_table.userId, userId), eq(lifting_exercises_table.id, exerciseAId)),
		);
	if (!exerciseAforUser.length) {
		return;
	}
	console.log("History of Exercise A for user:");
	console.log(exerciseAforUser);

	const twoDaysAgo = new Date(now);
	twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
	const exercisesForUserByDate = await db
		.select({
			date: workouts_lifting_table.date,
			name: lifting_exercises_table.name,
			maxWeight: workouts_lifting_exercises_table.maxWeight,
			totalSets: workouts_lifting_exercises_table.totalSets,
			totalReps: workouts_lifting_exercises_table.totalReps,
		})
		.from(workouts_lifting_table)
		.where(gte(workouts_lifting_table.date, twoDaysAgo.toISOString()))
		.leftJoin(
			workouts_lifting_exercises_table,
			eq(workouts_lifting_table.id, workouts_lifting_exercises_table.workoutId),
		)
		.leftJoin(
			lifting_exercises_table,
			eq(workouts_lifting_exercises_table.exerciseId, lifting_exercises_table.id),
		);
	if (!exercisesForUserByDate.length) {
		return;
	}
	console.log("Exercises for user by date:");
	console.log(exercisesForUserByDate);

	const backExercises = await db
		.select({
			name: lifting_exercises_table.name,
			primaryTarget: lifting_exercises_table.primaryTarget,
			maxWeight: workouts_lifting_exercises_table.maxWeight,
		})
		.from(lifting_exercises_table)
		.where(
			and(
				eq(lifting_exercises_table.userId, userId),
				eq(lifting_exercises_table.primaryTarget, "Back" satisfies MuscleGroups),
			),
		)
		.leftJoin(
			workouts_lifting_exercises_table,
			eq(lifting_exercises_table.id, workouts_lifting_exercises_table.exerciseId),
		);

	if (!backExercises.length) {
		return;
	}
	console.log("History of Back exercises for user:");
	console.log(backExercises);

	console.log("Cleaning up...");
	const deleteUserResult = await db
		.delete(users_table)
		.where(eq(users_table.id, userId))
		.returning();
	if (!deleteUserResult.length) {
		return;
	}
	console.log("Done!");
}

main();
