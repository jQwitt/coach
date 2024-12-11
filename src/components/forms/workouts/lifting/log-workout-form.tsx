"use client";

import { heading } from "@/app/fonts";
import { VerticalScrollWheel } from "@/components/controls/select-wheel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import useWorkoutStore from "@/hooks/stores/use-workout";
import { Check, Edit3, Plus, X } from "lucide-react";

export default function LogWorkoutLiftingForm() {
	const {
		workout: { name, exercises },
		setWorkoutName,
		addEmptyExercise,
		updateExerciseSets,
		updateExerciseName,
		removeExercise,
	} = useWorkoutStore();

	const exerciseLast = exercises.length - 1;
	const currentExercise = exercises[exerciseLast];
	const previousExercises = exercises.slice(0, exerciseLast);
	const { name: exerciseName, sets } = currentExercise;
	const setsLast = sets.length - 1;
	const currentSet = sets[setsLast];
	const { count, reps, weight } = currentSet;

	const handleSubmitStart = () => {};

	return (
		<form className="flex flex-col gap-4">
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
			<Card>
				<CardHeader className="mb-4">
					<input
						name="name"
						type="text"
						className={`peer w-full border-b-2 border-gray-200 pb-1 pt-3 text-primary placeholder-primary transition-colors focus:border-primary focus:text-gray-400 focus:placeholder-gray-400 focus:outline-none ${heading.className} text-3xl`}
						value={exerciseName}
						placeholder="Add an Exercise Name"
						onChange={(e) => {
							// updateAutoCompleteList(e.target.value);
							updateExerciseName(exerciseLast, e.target.value);
						}}
					/>
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
							<VerticalScrollWheel
								id="set-count"
								defaultValue={count}
								max={40}
								onChange={(value) => updateExerciseSets(exerciseLast, setsLast, { count: value })}
							/>
						</div>
						<div>
							<label className={`${heading.className} tracking-widest text-2xl`} htmlFor="set-reps">
								Reps.
							</label>
							<VerticalScrollWheel
								id="set-reps"
								defaultValue={reps}
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
							<VerticalScrollWheel
								id="set-weight"
								defaultValue={weight}
								step={0.5}
								min={0}
								max={1000}
								onChange={(value) => updateExerciseSets(exerciseLast, setsLast, { weight: value })}
							/>
						</div>
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
					onClick={() => addEmptyExercise()}
				>
					<Plus className="h-4 w-4" />
					Add to Workout
				</Button>
				<Button type="submit" className="w-full" onClick={() => handleSubmitStart()}>
					<Check className="h-4 w-4" />
					Finish Workout
				</Button>
			</div>
			<div>
				<Header title="Previous Exercises" level={HeaderLevel.SECTION} />
				<div className="flex gap-2 overflow-x-scroll py-4">
					{previousExercises.map((exercise, index) => (
						<Card key={index} className="min-w-[75%] min-h-[75%]">
							<CardContent className="-m-2">
								<div className="flex flex-row justify-between mt-4">
									<Header title={exercise.name} level={HeaderLevel.SECTION} />
									<Button
										className="hover:color-destructive"
										variant="ghost"
										size="icon"
										onClick={() => removeExercise(index)}
										type="button"
									>
										<X />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
					<div>
						{previousExercises.length === 0 ? (
							<p className="text-sm text-muted-foreground">
								Exercises will appear here as you log them!
							</p>
						) : null}
					</div>
				</div>
			</div>
		</form>
	);
}
