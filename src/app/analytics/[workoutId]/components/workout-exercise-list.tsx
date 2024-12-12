"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { WorkoutLiftingExerciseData } from "@/lib/types";
import { SearchX } from "lucide-react";
import * as React from "react";

// TODO: duration
enum SortMethods {
	NEWEST = "newest",
	OLDEST = "oldest",
	NAME = "name",
}

export default function WorkoutExerciseList({
	exercises,
}: { exercises: WorkoutLiftingExerciseData[] | null }) {
	const [sort, setSort] = React.useState<SortMethods>(SortMethods.NEWEST);

	if (!exercises) {
		return (
			<Card className="text-center space-x-6 bg-muted">
				<CardContent>
					<SearchX className="h-12 w-12 text-muted-foreground opacity-20 mx-auto my-4" />
					<p className="text-sm text-muted-foreground">
						Looks like there aren't any exercises associated with this workout
					</p>
				</CardContent>
			</Card>
		);
	}

	const sortedExercises =
		sort === SortMethods.NAME
			? [...exercises].sort((a, b) => (b.name ?? "b").localeCompare(a.name ?? "a"))
			: exercises;

	return (
		<div className="space-y-2">
			<Select onValueChange={(value) => setSort(value as SortMethods)}>
				<SelectTrigger className="w-[120px]">
					<SelectValue placeholder="Newest" defaultValue={"newest"} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="newest">Newest</SelectItem>
						<SelectItem value="oldest">Oldest</SelectItem>
						<SelectItem value="name">Name</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<div className={`flex flex-col${sort === SortMethods.OLDEST ? "-reverse" : ""} gap-2`}>
				{sortedExercises.map(({ name, totalReps, totalSets, maxWeight }) => (
					<Card key={name}>
						<CardHeader>
							<Header title={name ?? ""} level={HeaderLevel.SUB_SECTION} />
						</CardHeader>
						<CardContent>
							<div className="flex flex-row gap-2">
								<p>
									<span className="text-xl font-semibold">{totalSets}</span> Sets
								</p>
								<p>
									<span className="text-xl font-semibold">{totalReps}</span> Reps
								</p>
							</div>
							<p>
								Your heaviest weight was{" "}
								<span className="text-2xl font-semibold">{maxWeight} lbs.</span>
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
