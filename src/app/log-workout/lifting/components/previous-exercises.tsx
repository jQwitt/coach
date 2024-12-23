"use client";

import Header, { HeaderLevel } from "@/components/ui/header";
import useWorkoutStore from "@/hooks/stores/use-workout";
import PreviousExerciseCard from "./previous-exercise-card";

export default function PreviousExcersises() {
	const {
		workout: { exercises },
		removeExercise,
	} = useWorkoutStore();
	const previousExercises = exercises.slice(0, -1);

	return (
		<div>
			<Header title="Previous Exercises" level={HeaderLevel.SECTION} />
			{previousExercises.length === 0 ? (
				<div className="text-center my-6">
					<p className="text-sm text-muted-foreground">
						Exercises will appear here as you log them!
					</p>
				</div>
			) : (
				<div className="flex gap-2 overflow-x-scroll py-4">
					{previousExercises.map((exercise, index) => (
						<PreviousExerciseCard
							key={`previous-exercise-${exercise.name}`}
							exercise={exercise}
							onRemove={() => removeExercise(index)}
						/>
					))}
				</div>
			)}
		</div>
	);
}
