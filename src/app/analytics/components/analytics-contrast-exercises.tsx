"use client";

import { Card, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import type { WorkoutsDetailedByDateReturn } from "@/lib/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function AnalyticsContrastExercises({
	workouts,
}: { workouts: WorkoutsDetailedByDateReturn }) {
	const volumeByExerciseName: Record<
		string,
		{ count: number; totalSets: number; totalReps: number }
	> = {};

	for (const { exerciseName, totalReps, totalSets } of workouts) {
		if (volumeByExerciseName[exerciseName]) {
			volumeByExerciseName[exerciseName].count += 1;
			volumeByExerciseName[exerciseName].totalSets += totalSets ?? 0;
			volumeByExerciseName[exerciseName].totalReps += totalReps ?? 0;
		} else {
			volumeByExerciseName[exerciseName] = {
				count: 1,
				totalSets: totalSets ?? 0,
				totalReps: totalReps ?? 0,
			};
		}
	}

	const highestVolumeExercises = Object.entries(volumeByExerciseName)
		.sort((a, b) => b[1].totalSets - a[1].totalSets || b[1].totalReps - a[1].totalReps)
		.slice(0, 3);
	const lowestVolumeExercises = Object.entries(volumeByExerciseName)
		.sort((a, b) => a[1].totalSets - b[1].totalSets || a[1].totalReps - b[1].totalReps)
		.slice(0, 3);

	return (
		<div className="grid grid-cols-3 gap-2">
			<div className="col-span-3 flex items-center gap-2 mt-4">
				<Header title="Favorite Exercises" level={HeaderLevel.SECTION} />
				<ThumbsUp strokeWidth="3" />
			</div>
			{highestVolumeExercises.map(([exerciseName, { count, totalSets }], i) => (
				<Card key={exerciseName} className="col-span-3 md:col-span-1">
					<CardHeader className="flex flex-row items-center justify-between">
						<Header title={`${i + 1}.  ${exerciseName}`} level={HeaderLevel.SUB_SECTION} />
						<div className="flex flex-col items-end">
							<p className="text-primary font-bold text-lg">
								{totalSets}
								<span className="text-sm ml-1">sets</span>
							</p>
							<p className="text-muted-foreground text-xs">
								logged {count} {count > 1 ? "times" : "time"}
							</p>
						</div>
					</CardHeader>
				</Card>
			))}
			<div className="col-span-3 flex items-center gap-2 mt-4">
				<Header title="Least Favorite Exercises" level={HeaderLevel.SECTION} />
				<ThumbsDown strokeWidth="3" />
			</div>
			{lowestVolumeExercises.map(([exerciseName, { count, totalSets }], i) => (
				<Card key={exerciseName} className="col-span-3 md:col-span-1">
					<CardHeader className="flex flex-row items-center justify-between">
						<Header title={`${i + 1}.  ${exerciseName}`} level={HeaderLevel.SUB_SECTION} />
						<div className="flex flex-col items-end">
							<p className="text-primary font-bold text-lg">
								{totalSets}
								<span className="text-sm ml-1">sets</span>
							</p>
							<p className="text-muted-foreground text-xs">
								logged {count} {count > 1 ? "times" : "time"}
							</p>
						</div>
					</CardHeader>
				</Card>
			))}
		</div>
	);
}
