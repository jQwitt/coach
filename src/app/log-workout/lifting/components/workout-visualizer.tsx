"use client";

import * as React from "react";

import { HypertrophyRangeChart, VolumeChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import useWorkoutStore from "@/hooks/stores/use-workout";

enum Views {
	HYPERTROPHY_RANGE = "hypertrophy-range",
	VOLUME = "volume",
}

const Labels: Record<Views, string> = {
	[Views.HYPERTROPHY_RANGE]: "Hypertrophy Range",
	[Views.VOLUME]: "Volume",
};

export default function WorkoutVisualizer() {
	const { workout } = useWorkoutStore();
	const [view, setView] = React.useState<Views>(Views.HYPERTROPHY_RANGE);

	const previousExercises = workout.exercises.slice(0, -1);

	return (
		<div className="min-h-full md:mt-[5.125rem]">
			<Card>
				<CardHeader>
					<CardTitle>
						<Header title={Labels[view]} level={HeaderLevel.SUB_SECTION} />
					</CardTitle>
				</CardHeader>
				<CardContent>
					{previousExercises.length > 0 ? (
						<>
							{view === Views.HYPERTROPHY_RANGE ? (
								<HypertrophyRangeChart workout={workout} />
							) : (
								<VolumeChart workout={workout} />
							)}
						</>
					) : (
						<div className="flex min-h-[224px] flex-col justify-center">
							<p className="text-center text-sm text-muted-foreground">
								Data will be shown here as you workout!
							</p>
						</div>
					)}
					<div className="my-4 w-full">
						<Header title="Views" level={HeaderLevel.SUB_SECTION} />
						<div className="flex flex-wrap gap-4">
							{Object.entries(Labels).map(([key, label]) => {
								return (
									<Button
										key={`view-${key}`}
										className="rounded-full"
										variant="outline"
										size="sm"
										disabled={view === key}
										onClick={() => setView(key as Views)}
									>
										{label}
									</Button>
								);
							})}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
