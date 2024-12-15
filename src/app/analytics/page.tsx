import { getWorkoutsWithExercises, getWorkoutsWithExercisesSince } from "@/app/actions";
import Header from "@/components/ui/header";
import type { WorkoutAnalytics } from "@/lib/types";
import { ChartColumn } from "lucide-react";
import Analytics from "./components/analytics";

export default async function AnalyticsPage() {
	const week = new Date();
	week.setDate(week.getDate() - 7);

	const workouts = await getWorkoutsWithExercises();
	const workoutsThisWeek = await getWorkoutsWithExercisesSince({ date: week.toISOString() });

	const data: WorkoutAnalytics = {
		count: workouts.length,
		totalSets: 0,
		totalReps: 0,
		week: {
			count: 0,
			totalSets: 0,
			totalReps: 0,
		},
	};

	for (const { totalSets, totalReps } of workouts) {
		data.totalSets += totalSets ?? 0;
		data.totalReps += totalReps ?? 0;
	}

	for (const { totalSets, totalReps } of workoutsThisWeek) {
		data.week.count++;
		data.week.totalSets += totalSets ?? 0;
		data.week.totalReps += totalReps ?? 0;
	}

	return (
		<div className="space-y-4">
			<Header title="Analytics" Icon={ChartColumn} />
			<Analytics data={data} />
		</div>
	);
}
