"use client";

import { PlaceHolderCardEmpty } from "@/components/ui/cards/placeholder-empty";
import Header, { HeaderLevel } from "@/components/ui/header";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { WorkoutLifting } from "@/lib/types";
import { SearchSlash } from "lucide-react";
import * as React from "react";
import WorkoutCard from "./workout-card";

enum SortMethods {
	NEWEST = "newest",
	OLDEST = "oldest",
}

export default function WorkoutsList({ workouts }: { workouts: WorkoutLifting[] }) {
	const [sortBy, setSortBy] = React.useState(SortMethods.NEWEST);

	return (
		<>
			<Header title="Recent Workouts" level={HeaderLevel.SECTION} className="my-1" />
			<Select
				onValueChange={(value) => setSortBy(value as SortMethods)}
				disabled={!workouts.length}
			>
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
				{workouts?.map((workout) => {
					return <WorkoutCard data={workout} key={`${workout.name}-${workout.id}`} />;
				})}
				{!workouts?.length && (
					<PlaceHolderCardEmpty text="No workouts yet">
						<SearchSlash className="h-8 w-8 text-muted-foreground my-2" />
					</PlaceHolderCardEmpty>
				)}
			</div>
		</>
	);
}
