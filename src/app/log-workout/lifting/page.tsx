"use client";

import Image from "next/image";
import * as React from "react";
import Barbell from "../../../../public/images/dumbbell_black.png";

import LogWorkoutLiftingForm from "@/components/forms/workouts/lifting/log-workout-form";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";

enum Views {
	CURRENT_WORKOUT = "current-workout",
	STATS = "stats",
}

export default function LogWorkoutLifting() {
	const [view, setView] = React.useState<Views>(Views.CURRENT_WORKOUT);

	return (
		<div className=" max-w-4xl p-4 text-primary -mx-4">
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

			<div className="fixed bottom-0 right-0 justify-end p-4 gap-2 w-full md:hidden flex">
				<Button
					variant={"outline"}
					className="w-1/2"
					disabled={view === Views.CURRENT_WORKOUT}
					onClick={() => setView(Views.CURRENT_WORKOUT)}
				>
					Your Workout
				</Button>
				<Button
					variant={"outline"}
					className="w-1/2"
					disabled={view === Views.STATS}
					onClick={() => setView(Views.STATS)}
				>
					Stats
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-8">
				<div className="lg:col-span-4 sm:col-span-2">
					<LogWorkoutLiftingForm />
				</div>
				<div className="lg:col-span-5 sm:col-span-1">{/* <WorkoutVisualizer /> */}</div>
				<div className="lg:col-span-4 sm:col-span-1">{/* <WorkoutPreviousExercises /> */}</div>
				<div className="lg:col-span-4 sm:col-span-2">{/* <WorkoutStats /> */}</div>
			</div>
		</div>
	);
}
