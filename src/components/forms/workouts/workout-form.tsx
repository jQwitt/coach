"use client";

import { createWorkoutByUser } from "@/app/actions";
import { heading } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import useWorkoutStore from "@/hooks/stores/use-workout";
import { Edit3, PlusCircle } from "lucide-react";
import type * as React from "react";
import SetsForm from "./sets-form";

export default function WorkoutForm({ userId }: { userId: number }) {
	const {
		workout,
		setWorkoutName,
		updateExerciseName,
		addExercise,
		removeExercise,
		addSetToExercise,
		removeSetFromExercise,
		updateExerciseSets,
	} = useWorkoutStore();
	const { name, exercises } = workout;
	const initName = "Workout Name";

	const last = exercises.length - 1;
	const currentExercise = exercises[last];
	const { name: exerciseName, sets } = currentExercise;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const toSubmit = { ...workout, userId };
		if (name?.length === 0) {
			toSubmit.name = initName;
		}

		createWorkoutByUser({ data: toSubmit });
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
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
						addExercise(undefined);
					}
				}}
			>
				Add Exercise
				<PlusCircle className="mr-2 h-4 w-4" />
			</Button>
			<Button type="button" className="w-full" onClick={handleSubmit}>
				Log Workout
			</Button>
		</form>
	);
}
