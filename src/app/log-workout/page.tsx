"use client";

import Header from "@/components/ui/header";
import { BicepsFlexed, Bike, Mountain } from "lucide-react";
import { redirect } from "next/navigation";

export default function LogWorkout() {
	const workout = {
		className:
			"group p-4 items-center flex gap-2 hover:bg-gray-100 tracking-normal sm:hover:tracking-widest transition-all ease-out duration-200",
		icon: {
			className: "h-12 w-12 stroke-[2.5px] mr-2",
		},
	};

	return (
		<div className="flex flex-col -m-4 py-6">
			<button
				type="button"
				className={workout.className}
				onClick={() => redirect("/log-workout/lifting")}
			>
				<BicepsFlexed className={workout.icon.className} />
				<Header title="Weight Lifting" />
			</button>
			<button type="button" className={workout.className}>
				<Bike className={`${workout.icon.className} stroke-[2.25px]`} />
				<Header title="Cycling" />
			</button>
			<button type="button" className={workout.className}>
				<Mountain className={workout.icon.className} />
				<Header title="Climbing" />
			</button>
		</div>
	);
}
