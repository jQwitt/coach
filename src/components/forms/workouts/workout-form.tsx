"use client";

import { addKnownExerciseForUser, createWorkoutForUser } from "@/app/actions";
import { heading } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Header, { HeaderLevel } from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import useWorkoutStore from "@/hooks/stores/use-workout";
import { useToast } from "@/hooks/use-toast";
import { timeStamp } from "@/lib/encoding";
import { Edit3, Plus, X } from "lucide-react";
import { redirect } from "next/navigation";
import * as React from "react";
import SetsForm from "./sets-form";

const WORKOUT_NAME_ERROR = "Please add a name to your workout before saving.";
const WORKOUT_EXERCISES_EMPTY_ERROR = "Please add some exercises to your workout before saving.";
const WORKOUT_EXERCISES_COUNT_ERROR = "Cannot add more than 12 exercises to a workout!";
const WORKOUT_EXERCISES_NAME_ERROR = "Please add a name to your exercise before saving.";
const WORKOUT_EXERCISES_SETS_ERROR =
	"An exercise cannot have 0 sets, please add the number of sets you've done!";
const WORKOUT_EXERCISES_REPS_ERROR =
	"An exercise cannot have 0 reps, please add the number of reps you've done!";

export default function WorkoutForm({
	userId,
	exerciseNames,
}: { userId: number; exerciseNames: string[] }) {
	const {
		workout,
		reset,
		setWorkoutName,
		updateExerciseName,
		addEmptyExercise,
		addSetToExercise,
		removeSetFromExercise,
		updateExerciseSets,
	} = useWorkoutStore();
	const { name, exercises } = workout;

	const last = exercises.length - 1;
	const currentExercise = exercises[last];
	const { name: exerciseName } = currentExercise;
	const previousExercises = exercises.slice(0, last);

	const [error, setError] = React.useState("");
	const [submitting, setSubmitting] = React.useState(false);
	const [autoCompleteExerciseName, setAutoCompleteExerciseName] = React.useState<string[]>([]);
	const [isMounted, setIsMounted] = React.useState(false);

	const { toast } = useToast();

	React.useEffect(() => {
		// prevent hydration error
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <WorkoutFormLoading />;
	}

	const updateAutoCompleteList = (name: string) => {
		if (!name.length || !exerciseNames.length) {
			return [];
		}

		setAutoCompleteExerciseName(
			exerciseNames.filter((e) => e.toLowerCase().startsWith(name.toLowerCase())),
		);
	};

	const toastWithError = (message: string) => {
		toast({
			title: "Whoops!",
			description: message,
			variant: "destructive",
		});
	};

	const handleValidation = () => {
		if (name?.length === 0) {
			setError(WORKOUT_NAME_ERROR);
			return;
		}

		if (previousExercises.length === 0) {
			setError(WORKOUT_EXERCISES_EMPTY_ERROR);
			return;
		}

		for (const { name } of previousExercises) {
			if (!name.length) {
				setError(WORKOUT_EXERCISES_NAME_ERROR);
				return;
			}
		}

		setError("");
	};

	const handleAddExercise = () => {
		const { name, sets } = currentExercise;
		if (!name.length) {
			toastWithError(WORKOUT_EXERCISES_NAME_ERROR);
			return;
		}

		if (workout.exercises.length > 12) {
			toastWithError(WORKOUT_EXERCISES_COUNT_ERROR);
			return;
		}

		for (const { count, reps } of sets) {
			if (count === 0) {
				toastWithError(WORKOUT_EXERCISES_SETS_ERROR);
				return;
			}

			if (reps === 0) {
				toastWithError(WORKOUT_EXERCISES_REPS_ERROR);
				return;
			}
		}

		addEmptyExercise();
	};

	const handleSubmit = () => {
		const toSubmit = {
			...workout,
			userId,
			exercises: previousExercises,
			date: timeStamp(),
		};

		if (error.length === 0) {
			for (const { name } of previousExercises) {
				addKnownExerciseForUser({ userId, name });
			}
			createWorkoutForUser({ data: toSubmit }).then(() => {
				reset();
				redirect("/dashboard");
			});
		} else {
			setSubmitting(false);
		}
	};

	return (
		<form className="space-y-4" id="workout-form">
			<div className="min-w-full">
				<div className="relative">
					<input
						type="text"
						className={`${heading.className} peer w-full border-b-2 border-gray-200 pb-1 pt-3 text-2xl text-primary placeholder-primary transition-colors focus:border-primary focus:text-gray-400 focus:placeholder-gray-400 focus:outline-none`}
						placeholder="Workout Name"
						onChange={(e) => {
							setWorkoutName(e.target.value);
						}}
						value={name ?? ""}
					/>
					<Edit3 className="pointer-events-none absolute right-0 top-[25%] h-6 w-6 peer-focus:hidden" />
				</div>
			</div>
			<div className="relative space-y-2 rounded-md border border-gray-400 p-4">
				<div className="flex items-center justify-between">
					<div className="relative min-w-full">
						<input
							name="name"
							type="text"
							className="peer w-full border-b-2 border-gray-200 pb-1 pt-3 text-lg text-primary placeholder-primary transition-colors focus:border-primary focus:text-gray-400 focus:placeholder-gray-400 focus:outline-none"
							value={exerciseName}
							placeholder="Add an Exercise Name"
							onChange={(e) => {
								updateAutoCompleteList(e.target.value);
								updateExerciseName(last, e.target.value);
							}}
						/>
					</div>
				</div>
				{autoCompleteExerciseName.length ? (
					<div className="absolute  z-10 w-[calc(100%-2rem)] rounded-md border border-gray-400 bg-white p-2">
						<div className="flex items-center justify-between">
							<Header title="Previous Names" level={HeaderLevel.SUB_SECTION} />
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => setAutoCompleteExerciseName([])}
							>
								<X />
							</Button>
						</div>
						{autoCompleteExerciseName.map((name) => (
							<Button
								key={name}
								variant="ghost"
								className="w-full"
								onClick={() => {
									updateExerciseName(last, name);
									setAutoCompleteExerciseName([]);
								}}
							>
								{name}
							</Button>
						))}
					</div>
				) : null}
				<SetsForm
					index={last}
					addSet={addSetToExercise}
					removeSet={removeSetFromExercise}
					updateSet={updateExerciseSets}
				/>
			</div>
			<Button
				type="button"
				variant="outline"
				className="w-full"
				disabled={workout.exercises.length >= 11}
				onClick={handleAddExercise}
			>
				<Plus className="h-4 w-4" />
				Add to Workout
			</Button>

			<Dialog>
				<DialogTrigger asChild>
					<Button type="button" className="w-full" onClick={handleValidation}>
						Finish Workout
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-[80%] sm:max-w-[50%] rounded-lg">
					<DialogTitle className="hidden">Your Summary</DialogTitle>
					<DialogDescription>
						<Header title="Workout Summary" level={HeaderLevel.SECTION} />
						{error.length === 0 ? (
							<div>
								<p className="font-semibold text-sm">{workout.name}</p>
								{previousExercises.map((e, i) => (
									<p key={`${e.name}-${i}`}>{e.name}</p>
								))}
							</div>
						) : (
							<p className="text-primary text-md">{error}</p>
						)}
					</DialogDescription>
					<Button
						type="submit"
						form="workout-form"
						className="w-full"
						onClick={() => {
							setSubmitting(true);
							handleSubmit();
						}}
						disabled={error.length > 0 || submitting}
					>
						Save
					</Button>
				</DialogContent>
			</Dialog>
		</form>
	);
}

export function WorkoutFormLoading() {
	return (
		<div className="space-y-4">
			<Skeleton className="h-10 w-full mb-1 mt-3" />
			<Skeleton className="h-40 space-y-2 rounded-md p-4" />
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
		</div>
	);
}
