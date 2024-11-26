"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import useWorkoutStore from "@/hooks/stores/use-workout";
import { X } from "lucide-react";

export default function WorkoutPreviousExercises() {
	const { workout, removeExercise } = useWorkoutStore();

	const previousExercises = workout.exercises.slice(0, -1);

	return (
		<Card className="h-full">
			<CardHeader>
				<Header title="Previous Exercises" level={HeaderLevel.SECTION} />
			</CardHeader>
			<CardContent className="flex flex-row flex-wrap gap-1">
				{previousExercises.length === 0 && (
					<p className="text-sm text-muted-foreground">
						Exercises will appear here as you workout!
					</p>
				)}
				{previousExercises.map((exercise, index) => (
					<div
						key={`exercise-${index}`}
						className="flex items-center gap-2 rounded-md border-muted border w-fit pl-4"
					>
						<p className="text-sm text-muted-foreground font-semibold">{exercise.name}</p>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => removeExercise(index)}
							className=" text-primary hover:text-red-700 rounded-full"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
