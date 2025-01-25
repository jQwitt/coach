import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { lifting_exercises_table } from "./exercises";
import { users_table } from "./users";

export const workouts_lifting_table = pgTable("WorkoutsLifting", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// references
	userId: integer()
		.references(() => users_table.id, { onDelete: "cascade" })
		.notNull(),

	// data fields
	name: varchar({ length: 255 }).notNull(),
	date: varchar({ length: 12 }).notNull(),
	timeStarted: varchar({ length: 30 }).notNull(),
	timeCompleted: varchar({ length: 30 }).notNull(),
	duration: varchar({ length: 5 }).notNull(),
});

export const workouts_lifting_exercises_table = pgTable(
	"WorkoutsToLiftingExercises",
	{
		workoutId: integer()
			.notNull()
			.references(() => workouts_lifting_table.id, { onDelete: "cascade" }),
		exerciseId: integer()
			.notNull()
			.references(() => lifting_exercises_table.id, { onDelete: "cascade" }),
		userId: integer()
			.notNull()
			.references(() => users_table.id, { onDelete: "cascade" }),

		totalSets: integer().notNull(),
		totalReps: integer().notNull(),
		maxWeight: varchar({ length: 10 }).notNull(),
		serializedSetData: varchar({ length: 255 }).array().notNull().default([]),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.workoutId, t.exerciseId] }),
	}),
);

export const workouts_lifting_relations = relations(
	workouts_lifting_exercises_table,
	({ many }) => ({
		exercises: many(workouts_lifting_exercises_table),
	}),
);
