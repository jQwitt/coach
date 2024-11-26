import Image from "next/image";
import Barbell from "../../../../public/images/dumbbell_black.png";

import { getCurrentUser } from "@/app/actions";
import WorkoutForm from "@/components/forms/workouts/workout-form";
import Header from "@/components/ui/header";

import { Card, CardContent } from "@/components/ui/card";
import WorkoutPreviousExercises from "./components/previous-exercises";
import WorkoutStats from "./components/workout-stats";
import WorkoutVisualizer from "./components/workout-visualizer";

export default async function LogWorkoutLifting() {
	const { id, exerciseNames } = (await getCurrentUser()) ?? {};

	if (!id) {
		return <div>Not logged in</div>;
	}

	return (
		<div className="mx-auto max-w-4xl p-4 text-primary">
			<div className="flex items-center">
				<Image
					src={Barbell}
					alt="dumbbell logo"
					width={48}
					height={48}
					className="-mt-1 rotate-45 mr-2"
				/>
				<Header title="Weights" />
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-8">
				<Card className="lg:col-span-3 sm:col-span-2">
					<CardContent>
						<WorkoutForm userId={id} exerciseNames={exerciseNames ?? []} />
					</CardContent>
				</Card>
				<div className="lg:col-span-5 sm:col-span-1">
					<WorkoutVisualizer />
				</div>
				<div className="lg:col-span-4 sm:col-span-1">
					<WorkoutPreviousExercises />
				</div>
				<div className="lg:col-span-4 sm:col-span-2">
					<WorkoutStats />
				</div>
			</div>
		</div>
	);
}
