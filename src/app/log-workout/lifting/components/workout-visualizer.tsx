"use client";

import * as React from "react";

import { HypertrophyRangeChart } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Header, { HeaderLevel } from "@/components/ui/header";
import useWorkoutStore from "@/hooks/stores/use-workout";
import { Line, LineChart } from "recharts";
import { getRepsPerExercise, getSetsPerExercise } from "../helpers";

enum Views {
	HYPERTROPHY_RANGE = "hypertrophy-range",
	TOTAL_REPS_PER_EXERCISE = "total-reps-per-exercise",
	SETS_PER_EXERCISE = "sets-per-exercise",
}

type ChartViews = {
	[view in Views]: {
		label: string;
		dataKey: string;
		buttonLabel: string;
	};
};

const charts = {
	[Views.HYPERTROPHY_RANGE]: {
		label: "Hypertrophy Range",
		dataKey: "reps",
		buttonLabel: "Hypertrophy Range",
	},
	[Views.TOTAL_REPS_PER_EXERCISE]: {
		label: "Total Reps per Exercise",
		dataKey: "reps",
		buttonLabel: "Total Reps / Exercise",
	},
	[Views.SETS_PER_EXERCISE]: {
		label: "Sets per Exercise",
		dataKey: "sets",
		buttonLabel: "Sets / Exercise",
	},
} satisfies ChartViews;

export default function WorkoutVisualizer() {
	const { workout } = useWorkoutStore();
	const [view, setView] = React.useState<Views>(Views.HYPERTROPHY_RANGE);

	const previousExercises = workout.exercises.slice(0, -1);

	const data =
		view === Views.TOTAL_REPS_PER_EXERCISE
			? getRepsPerExercise(previousExercises)
			: view === Views.SETS_PER_EXERCISE
				? getSetsPerExercise(previousExercises)
				: [];

	return (
		<div className="space-y-4">
			<Header title="Your Workout in Data" level={HeaderLevel.SECTION} />

			<Card>
				<CardHeader>
					<CardTitle>
						<Header title={charts[view].label} level={HeaderLevel.SUB_SECTION} />
					</CardTitle>
				</CardHeader>
				<CardContent>
					{previousExercises.length > 0 ? (
						<>
							{view === Views.HYPERTROPHY_RANGE ? (
								<HypertrophyRangeChart workout={workout} />
							) : (
								<ChartContainer
									config={{
										rate: {
											label: charts[view]?.label,
											color: "hsl(var(--chart-1))",
										},
									}}
									className="h-1/2 w-full"
								>
									<LineChart data={data}>
										<Line
											type="monotone"
											dataKey={charts[view].dataKey}
											stroke="var(--color-rate)"
											strokeWidth={2}
										/>
										<ChartTooltip content={<ChartTooltipContent />} />
									</LineChart>
								</ChartContainer>
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
							{Object.entries(charts).map(([key, { buttonLabel }]) => {
								return (
									<Button
										key={`view-${key}`}
										className="rounded-full"
										variant="outline"
										size="sm"
										disabled={view === key}
										onClick={() => setView(key as Views)}
									>
										{buttonLabel}
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
