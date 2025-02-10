"use client";

import * as React from "react";

import { saveWorkoutLifting } from "@/app/actions";
import { heading } from "@/app/fonts";
import { VerticalScrollWheelControlled } from "@/components/forms/workouts/lifting/select-wheel-controlled";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Header, { HeaderLevel } from "@/components/ui/header";
import useWorkoutStore from "@/hooks/stores/use-workout";
import { useObjectFilter } from "@/hooks/use-object-filter";
import { useToast } from "@/hooks/use-toast";
import { fromIso, timeStamp } from "@/lib/encoding";
import type { ExercisesReturn, MuscleGroupString } from "@/lib/types";
import { Check, Edit3, HelpCircle, History, Loader2, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import MuscleGroupSelect from "../../controls/muscle-group-select";

export default function LogWorkoutLiftingForm({
	knownExercises,
}: { knownExercises: ExercisesReturn }) {
	const {
		workout,
		reset,
		setWorkoutName,
		addEmptyExercise,
		updateExerciseSets,
		updateExerciseName,
		updateExercisePrimaryTarget,
	} = useWorkoutStore();

	const { toast, dismiss, toasts } = useToast();
	const toastError = React.useCallback(
		(description: string) => {
			toast({
				title: "Whoops!",
				description,
				variant: "destructive",
			});
		},
		[toast],
	);

	const [timeStarted] = React.useState(timeStamp());
	const [submitting, setSubmitting] = React.useState(false);

	const { visible, isEmpty, noMatches, results, filterByQuery, show, hide } = useObjectFilter(
		{
			list: knownExercises,
			key: "name",
		},
		{ defaultToHidden: true },
	);

	const { name, exercises } = workout;
	const exerciseLast = exercises.length - 1;
	const currentExercise = exercises[exerciseLast];
	const previousExercises = exercises.slice(0, exerciseLast);
	const { name: exerciseName, sets } = currentExercise;
	const setsLast = sets.length - 1;
	const currentSet = sets[setsLast];
	const { count, reps, weight } = currentSet;

	const handleAddExercise = () => {
		const { name, sets } = currentExercise;
		if (!name.length) {
			toastError("Please add a name to your exercise before saving.");
			return;
		}

		for (const { count, reps } of sets) {
			if (count < 1) {
				toastError("Please add at least one set to your exercise before saving.");
				return;
			}
			if (reps < 1) {
				toastError("Please add at least one rep to your current set before saving.");
				return;
			}
		}

		dismiss(toasts[0]?.id);
		addEmptyExercise();
	};

	const handleSubmitStart = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!name.length) {
			toastError("Please add a name to your workout before finishing!");
			e.preventDefault();
		}
		if (!previousExercises.length) {
			toastError("Please add at least one exercise to your workout before finishing!");
			e.preventDefault();
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);

		// if the server fails to save, don't block a retry
		const retry = setTimeout(() => {
			setSubmitting(false);
			toastError("Something went wrong on our end, please try again.");
		}, 5000);

		const timeCompleted = timeStamp();
		const date = timeCompleted.split("T")[0];
		const duration = (
			(fromIso(timeCompleted).getTime() - fromIso(timeStarted).getTime()) /
			(1000 * 60)
		).toPrecision(2);

		const formattedPreviousExercises = previousExercises.map((e) => {
			const { name } = e;
			const fname = name
				.toLowerCase()
				.split(" ")
				.map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
				.join(" ");

			return { ...e, name: fname };
		});

		const result = await saveWorkoutLifting({
			name,
			exercises: formattedPreviousExercises, // only include exercises "added" manually
			timeStarted,
			timeCompleted,
			date,
			duration,
		});

		if (result) {
			reset();
			redirect("/dashboard");
		} else {
			toastError("Something went wrong on our end, please try again.");
		}
		clearTimeout(retry);
	};

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit} id="log-workout-lifting-form">
			<div className="relative">
				<input
					type="text"
					className={`${heading.className} peer w-full border-b-2 border-gray-200 pb-1 pt-3 text-2xl text-primary placeholder-primary transition-colors focus:border-primary focus:text-gray-400 focus:placeholder-gray-400 focus:outline-none`}
					placeholder="Add a Workout Name"
					onChange={({ target: { value } }) => {
						setWorkoutName(value);
					}}
					value={name ?? ""}
				/>
				<Edit3 className="pointer-events-none absolute right-0 top-[25%] h-6 w-6 peer-focus:hidden" />
			</div>
			<Card className="mt-4">
				<CardHeader className="relative">
					{knownExercises.length > 0 && (
						<div>
							{!visible ? (
								<Button
									size="sm"
									variant="outline"
									className="absolute -top-5 right-3"
									onClick={show}
									type="button"
								>
									Past Exercises
									<History className="h-4 w-4" />
								</Button>
							) : (
								<Button
									size="sm"
									variant="outline"
									className="absolute -top-5 right-3"
									onClick={hide}
									type="button"
								>
									Close
									<Minus className="h-4 w-4" />
								</Button>
							)}
						</div>
					)}
					<input
						name="name"
						type="text"
						className={`peer w-full border-b-2 border-gray-200 pb-1 pt-3 text-primary placeholder-primary transition-colors focus:border-primary focus:text-gray-400 focus:placeholder-gray-400 focus:outline-none ${heading.className} text-3xl`}
						value={exerciseName}
						placeholder="Add an Exercise Name"
						onChange={({ target: { value } }) => {
							updateExerciseName(exerciseLast, value);
							filterByQuery(value);
						}}
					/>
					{visible ? (
						<div className="absolute top-20 left-4 w-[calc(100%-2rem)] bg-card h-fit z-10">
							<Card className="rounded-sm w-full p-1">
								<div className="flex justify-center items-center my-2 opacity-65">
									{noMatches ? (
										<p className="text-sm text-muted-foreground">
											No matching previously logged exercises found
										</p>
									) : null}
									{isEmpty ? (
										<p className="text-sm text-muted-foreground">
											No previously logged exercises found
										</p>
									) : null}
								</div>
								{results.map(({ name, primaryTarget }) => (
									<button
										type="button"
										key={name}
										className="flex justify-between items-center w-full hover:bg-muted rounded-sm p-1"
										onClick={() => {
											updateExerciseName(exerciseLast, name);
											updateExercisePrimaryTarget(exerciseLast, primaryTarget as MuscleGroupString);
											hide();
										}}
									>
										<p className="text-sm text-primary">{name}</p>
										<p className="text-xs text-muted-foreground">{primaryTarget}</p>
									</button>
								))}
							</Card>
						</div>
					) : null}
				</CardHeader>
				<CardContent>
					<div className="flex justify-around text-center gap-4 min-w-full">
						<div>
							<label
								className={`${heading.className} tracking-widest text-2xl`}
								htmlFor="set-count"
							>
								Sets
							</label>
							<VerticalScrollWheelControlled
								id="set-count"
								value={count}
								max={40}
								onChange={(value) => updateExerciseSets(exerciseLast, setsLast, { count: value })}
							/>
						</div>
						<div>
							<label className={`${heading.className} tracking-widest text-2xl`} htmlFor="set-reps">
								Reps.
							</label>
							<VerticalScrollWheelControlled
								id="set-reps"
								value={reps}
								onChange={(value) => updateExerciseSets(exerciseLast, setsLast, { reps: value })}
							/>
						</div>
						<div>
							<label
								className={`${heading.className} tracking-widest text-2xl`}
								htmlFor="set-weight"
							>
								Weight (lbs.)
							</label>
							<VerticalScrollWheelControlled
								id="set-weight"
								className="w-36"
								value={weight}
								step={0.5}
								min={0}
								max={1000}
								onChange={(value) => updateExerciseSets(exerciseLast, setsLast, { weight: value })}
								inputMode="decimal"
							/>
						</div>
					</div>
					<div className="mt-8">
						<label htmlFor="primaryTarget" className="text-sm text-muted-foreground">
							Primary Muscle Group
						</label>
						<MuscleGroupSelect
							value={currentExercise.primaryTarget}
							onChange={(primaryTarget) => updateExercisePrimaryTarget(exerciseLast, primaryTarget)}
						/>

						{knownExercises.length > 0 ? (
							<div className="mt-4 text-xs text-muted-foreground flex gap-1 opacity-65">
								<div className="flex gap-1 group">
									<p>You can also edit previously logged exercises on </p>
									<Link href={"/profile"} className="group-hover:underline">
										your profile
									</Link>
								</div>
								<HelpCircle className="h-4 w-4" />
							</div>
						) : null}
					</div>
					<div>
						{sets.slice(0, -1).map(({ count, reps, weight }, index) => (
							<p key={index}>
								{count} x {reps} @ {weight}
							</p>
						))}
					</div>
				</CardContent>
			</Card>
			<div className="space-y-2">
				<Button
					type="button"
					variant="outline"
					className="w-full"
					disabled={exercises.length >= 11}
					onClick={handleAddExercise}
				>
					<Plus className="h-4 w-4" />
					Add to Workout
				</Button>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							type="button"
							className="fixed bottom-2 right-4 z-10 w-[calc(100%-2rem)] sm:w-auto"
							onClick={handleSubmitStart}
						>
							<Check className="h-4 w-4" />
							Finish Workout
						</Button>
					</DialogTrigger>
					<DialogTitle className="hidden">Workout Summary</DialogTitle>
					<DialogContent className=" relativemax-w-[80%] sm:max-w-[50%] rounded-lg">
						<Header title="Workout Summary" level={HeaderLevel.SECTION} />
						<div>
							{previousExercises.map(({ name, sets }, index) => (
								<div key={`previous-exercise-${index}`} className="w-full flex justify-between">
									<p>{name}</p>
									{sets.map(({ count, reps, weight }, index) => (
										<p key={`set-${index}`}>
											{count} x {reps} @ {weight}
										</p>
									))}
								</div>
							))}
						</div>
						<Button
							type="submit"
							form="log-workout-lifting-form"
							className="w-full"
							disabled={submitting}
						>
							{submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <p>Save Workout</p>}
						</Button>
					</DialogContent>
				</Dialog>
			</div>
		</form>
	);
}
