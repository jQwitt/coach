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
import { useToast } from "@/hooks/use-toast";
import { fromIso, timeStamp } from "@/lib/encoding";
import type { ExercisesReturn, MuscleGroups } from "@/lib/types";
import { Check, Edit3, HelpCircle, Loader2, Plus, ScanText, X } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import MuscleGroupSelect from "../../controls/muscle-group-select";

export default function LogWorkoutLiftingForm({
	knownExercises,
}: { knownExercises: ExercisesReturn }) {
	const {
		workout,
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
	const [autoCompleteList, setAutoCompleteList] = React.useState<ExercisesReturn>([]);
	const [hideAutoComplete, setHideAutoComplete] = React.useState(false);
	const [hasClickedAutoComplete, sethasClickedAutoComplete] = React.useState(false);

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

	const updateAutoCompleteList = (query: string) => {
		setAutoCompleteList(
			knownExercises.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase())),
		);
	};

	const handleSubmitStart = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!name.length) {
			toastError("Please add a name to your workout before finishing!");
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

		await saveWorkoutLifting({
			name,
			exercises: previousExercises, // only include exercises "added" manually
			timeStarted,
			timeCompleted,
			date,
			duration,
		});

		clearTimeout(retry);
		redirect("/dashboard");
	};

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit} id="log-workout-lifting-form">
			<div className="relative">
				<input
					type="text"
					className={`${heading.className} peer w-full border-b-2 border-gray-200 pb-1 pt-3 text-2xl text-primary placeholder-primary transition-colors focus:border-primary focus:text-gray-400 focus:placeholder-gray-400 focus:outline-none`}
					placeholder="Add a Workout Name"
					onChange={(e) => {
						setWorkoutName(e.target.value);
					}}
					value={name ?? ""}
				/>
				<Edit3 className="pointer-events-none absolute right-0 top-[25%] h-6 w-6 peer-focus:hidden" />
			</div>
			<Card>
				<CardHeader className="relative">
					<div>
						{hideAutoComplete && (
							<Button
								size="sm"
								variant="ghost"
								className="absolute top-0 right-0"
								onClick={() => setHideAutoComplete(false)}
								type="button"
							>
								AutoComplete
								<ScanText className="h-4 w-4" />
							</Button>
						)}
					</div>
					<input
						name="name"
						type="text"
						className={`peer w-full border-b-2 border-gray-200 pb-1 pt-3 text-primary placeholder-primary transition-colors focus:border-primary focus:text-gray-400 focus:placeholder-gray-400 focus:outline-none ${heading.className} text-3xl`}
						value={exerciseName}
						placeholder="Add an Exercise Name"
						onChange={({ target: { value } }) => {
							sethasClickedAutoComplete(false);
							updateAutoCompleteList(value);
							updateExerciseName(exerciseLast, value);
						}}
					/>
					{!hideAutoComplete && autoCompleteList.length > 0 ? (
						<Card className="absolute top-20 left-0 w-full p-4 bg-card h-fit z-10 pt-6">
							<Button
								size="icon"
								variant="ghost"
								className="absolute top-0 right-0"
								onClick={() => setHideAutoComplete(true)}
								type="button"
							>
								<X className="h-4 w-4" />
							</Button>
							{autoCompleteList.map(({ name, primaryTarget }) => (
								<button
									type="button"
									key={name}
									className="flex justify-between items-center w-full hover:bg-muted rounded-sm p-1"
									onClick={() => {
										setAutoCompleteList([]);
										sethasClickedAutoComplete(true);
										updateExerciseName(exerciseLast, name);
										updateExercisePrimaryTarget(exerciseLast, primaryTarget as MuscleGroups);
									}}
								>
									<p className="text-primary">{name}</p>
									<p className="text-xs text-muted-foreground">{primaryTarget}</p>
								</button>
							))}
						</Card>
					) : null}
				</CardHeader>
				<CardContent>
					<div className="flex justify-around text-center gap-4 min-w-full">
						<div>
							<label
								className={`${heading.className} tracking-widest text-2xl`}
								htmlFor="set-count"
							>
								Count
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
							disabled={hasClickedAutoComplete || autoCompleteList.length > 0}
							value={currentExercise.primaryTarget}
							onChange={(primaryTarget) => updateExercisePrimaryTarget(exerciseLast, primaryTarget)}
						/>
						{hasClickedAutoComplete && (
							<div className="mt-4 text-xs text-muted-foreground flex gap-1 opacity-65">
								<div className="flex gap-1 group">
									<p>You can edit previously logged exercises on </p>
									<Link href={"/profile"} className="group-hover:underline">
										your profile
									</Link>
								</div>
								<HelpCircle className="h-4 w-4" />
							</div>
						)}
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
						<Button type="button" className="w-full" onClick={handleSubmitStart}>
							<Check className="h-4 w-4" />
							Finish Workout
						</Button>
					</DialogTrigger>
					<DialogTitle className="hidden">Workout Summary</DialogTitle>
					<DialogContent className="max-w-[80%] sm:max-w-[50%] rounded-lg">
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
