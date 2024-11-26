"use client";

import { addKnownExerciseForUser, createWorkoutByUser } from "@/app/actions";
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
import useWorkoutStore from "@/hooks/stores/use-workout";
import { timeStamp } from "@/lib/encoding";
import { Edit3, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import * as React from "react";
import SetsForm from "./sets-form";

export default function WorkoutForm({ userId }: { userId: number }) {
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
	const initName = "Workout Name";

	const last = exercises.length - 1;
	const currentExercise = exercises[last];
	const { name: exerciseName } = currentExercise;
	const previousExercises = exercises.slice(0, last);

	const [error, setError] = React.useState("");
	const [submitting, setSubmitting] = React.useState(false);

	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		// prevent hydration error
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	const handleValidation = () => {
		if (name?.length === 0) {
			setError("Please add a name to your workout before saving.");
			return;
		}

		if (previousExercises.length === 0) {
			setError("Please add some exercises to your workout before saving.");
			return;
		}

		setError("");
	};

	const handleSubmit = () => {
		const toSubmit = {
			...workout,
			userId,
			exercises: previousExercises,
			date: timeStamp(),
		};

		if (name?.length === 0) {
			toSubmit.name = initName;
		}

		if (error.length === 0) {
			for (const { name } of previousExercises) {
				addKnownExerciseForUser({ userId, name });
			}
			createWorkoutByUser({ data: toSubmit }).then(() => {
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
						onChange={(e) => {
							setWorkoutName(e.target.value);
						}}
						value={name?.length && name.length > 0 ? name : initName}
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
							onChange={(e) => {
								updateExerciseName(last, e.target.value);
							}}
						/>
					</div>
				</div>
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
				onClick={() => {
					if (workout.exercises.length < 11) {
						addEmptyExercise();
					}
				}}
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
