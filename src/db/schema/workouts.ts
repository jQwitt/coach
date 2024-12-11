import { relations } from "drizzle-orm";
import { date, integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { user_lifting_exercises_table } from "./exercises";
import { user_tag_table } from "./tags";
import { users_table } from "./users";

export const workouts_lifting_table = pgTable("WorkoutsLifting", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),

	// references
	userId: integer()
		.references(() => users_table.id, { onDelete: "cascade" })
		.notNull(),
	tags: integer()
		.references(() => user_tag_table.id, { onDelete: "cascade" })
		.array()
		.notNull()
		.default([]),

	// data fields
	name: varchar({ length: 255 }).notNull(),
	date: date().notNull(),
	timeStarted: date().notNull(),
	timeCompleted: date().notNull(),
	duration: varchar({ length: 50 }).notNull(),
});

export const workouts_lifting_relations = relations(workouts_lifting_table, ({ many }) => ({
	workouts_lifting_to_exercises: many(workouts_lifting_exercises_table),
}));

export const workouts_lifting_exercises_table = pgTable(
	"WorkoutsLiftingExercises",
	{
		workoutId: integer()
			.notNull()
			.references(() => workouts_lifting_table.id, { onDelete: "cascade" }),
		exerciseId: integer()
			.notNull()
			.references(() => user_lifting_exercises_table.id, { onDelete: "cascade" }),
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
