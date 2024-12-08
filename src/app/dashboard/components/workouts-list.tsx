"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { WorkoutLiftingDataWithID } from "@/lib/types";
import * as React from "react";
import WorkoutCard from "./workout-card";

enum SortMethods {
	NEWEST = "newest",
	OLDEST = "oldest",
}

export default function WorkoutsList({ workouts }: { workouts: WorkoutLiftingDataWithID[] }) {
	const [sortBy, setSortBy] = React.useState(SortMethods.NEWEST);

	return (
		<>
			<Select onValueChange={(value) => setSortBy(value as SortMethods)}>
				<SelectTrigger className="w-[120px]">
					<SelectValue placeholder="Newest" defaultValue={"newest"} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="newest">Newest</SelectItem>
						<SelectItem value="oldest">Oldest</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<div className={`flex flex-col${sortBy === SortMethods.NEWEST ? "" : "-reverse"} gap-2`}>
				{workouts.map((workout) => {
					return <WorkoutCard data={workout} key={`${workout.name}-${workout.id}`} />;
				})}
			</div>
		</>
	);
}