"use client";

import { PlaceHolderCardEmpty } from "@/components/ui/cards/placeholder-empty";
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
				<PlaceHolderCardEmpty text="Exercises will appear here as you workout!" height="120px" />
			) : (
				<div className="side-scroll space-x-2">
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
