ALTER TABLE "UserLiftingExercises" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "UserTags" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "UserLiftingExercises" CASCADE;--> statement-breakpoint
DROP TABLE "UserTags" CASCADE;--> statement-breakpoint
ALTER TABLE "UsersLiveCoachConversations" RENAME TO "LiveCoachConversations";--> statement-breakpoint
ALTER TABLE "WorkoutsLiftingExercises" RENAME TO "WorkoutsToLiftingExercises";--> statement-breakpoint
ALTER TABLE "LiveCoachConversations" DROP CONSTRAINT "UsersLiveCoachConversations_userId_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "WorkoutsToLiftingExercises" DROP CONSTRAINT "WorkoutsLiftingExercises_workoutId_WorkoutsLifting_id_fk";
--> statement-breakpoint
ALTER TABLE "WorkoutsToLiftingExercises" DROP CONSTRAINT "WorkoutsLiftingExercises_exerciseId_LiftingExercises_id_fk";
--> statement-breakpoint
ALTER TABLE "WorkoutsToLiftingExercises" DROP CONSTRAINT "WorkoutsLiftingExercises_userId_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "WorkoutsToLiftingExercises" DROP CONSTRAINT "WorkoutsLiftingExercises_workoutId_exerciseId_pk";--> statement-breakpoint
ALTER TABLE "WorkoutsToLiftingExercises" ADD CONSTRAINT "WorkoutsToLiftingExercises_workoutId_exerciseId_pk" PRIMARY KEY("workoutId","exerciseId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "LiveCoachConversations" ADD CONSTRAINT "LiveCoachConversations_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "WorkoutsToLiftingExercises" ADD CONSTRAINT "WorkoutsToLiftingExercises_workoutId_WorkoutsLifting_id_fk" FOREIGN KEY ("workoutId") REFERENCES "public"."WorkoutsLifting"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "WorkoutsToLiftingExercises" ADD CONSTRAINT "WorkoutsToLiftingExercises_exerciseId_LiftingExercises_id_fk" FOREIGN KEY ("exerciseId") REFERENCES "public"."LiftingExercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "WorkoutsToLiftingExercises" ADD CONSTRAINT "WorkoutsToLiftingExercises_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN IF EXISTS "tags";--> statement-breakpoint
ALTER TABLE "WorkoutsLifting" DROP COLUMN IF EXISTS "tags";