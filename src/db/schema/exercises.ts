import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, serial, varchar } from "drizzle-orm/pg-core";
import { users_table } from "./users";
import { workouts_lifting_exercises_table } from "./workouts";

export const user_lifting_exercises_table = pgTable("LiftingExercises", {
	id: serial("id").primaryKey(),

	// references
	userId: integer()
		.references(() => users_table.id, { onDelete: "cascade" })
		.notNull(),

	// data fields
	name: varchar({ length: 255 }).notNull(),
	primaryTarget: varchar({ length: 100 }).notNull(),
	detailedTargets: varchar({ length: 100 }).array().notNull(),
});

export const exercisesToUsers = pgTable(
	"UserLiftingExercises",
	{
		userId: integer(),
		exerciseId: integer(),
	},
	(table) => {
		return [
			{
				pk: primaryKey({ columns: [table.userId, table.exerciseId] }),
			},
		];
	},
);

export const user_lifting_exercises_relations = relations(
	user_lifting_exercises_table,
	({ many }) => ({
		user_lifting_exercises_table: many(workouts_lifting_exercises_table),
	}),
);
