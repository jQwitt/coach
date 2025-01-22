import { getExercises } from "@/app/actions";
import LogWorkoutLiftingForm from "@/components/forms/workouts/lifting/log-workout-form";
import Header from "@/components/ui/header";
import Image from "next/image";
import Barbell from "../../../../public/images/dumbbell_black.png";
import PreviousExcersises from "./components/previous-exercises";
import WorkoutVisualizer from "./components/workout-visualizer";

export default async function LogWorkoutLifting() {
	const knownExercises = await getExercises();

	return (
		<div className="max-w-4xl p-4 text-primary mx-auto">
			<div className="items-center hidden md:flex">
				<Image
					src={Barbell}
					alt="dumbbell logo"
					width={48}
					height={48}
					className="-mt-1 rotate-45 mr-2"
				/>
				<Header title="Weights" />
			</div>

			<div className="grid grid-cols-1 gap-x-4 gap-y-10 md:gap-y-4 md:grid-cols-9">
				<div className="md:col-span-5 col-span-1">
					<LogWorkoutLiftingForm knownExercises={knownExercises} />
				</div>
				<div className="md:col-span-9 col-span-1 sm:row-start-2">
					<PreviousExcersises />
				</div>
				<div className="md:col-span-4 col-span-1">
					<WorkoutVisualizer />
				</div>
			</div>
		</div>
	);
}
