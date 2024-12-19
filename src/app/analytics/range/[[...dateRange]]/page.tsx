import { getDetailedWorkoutsForDates, getPreviousDetailedWorkoutsByIncrement } from "@/app/actions";
import Header from "@/components/ui/header";
import type { WorkoutAnalytics } from "@/lib/types";
import { ChartColumn } from "lucide-react";
import AnalyticsQuickStats from "../../components/analytics-quick-stats";
import { getVolume } from "../../helpers";
import { parse } from "../../helpers/date-ranges";
import type { PageProps } from ".next/types/app/page";

export default async function AnalyticsDateRagePage({
	params,
}: { params: { dateRange: string } } & PageProps) {
	const { dateRange } = await params;
	const { startDate, endDate, increment } = parse(dateRange);

	const workouts = await getDetailedWorkoutsForDates({ startDate, endDate });
	const previousWorkouts = await getPreviousDetailedWorkoutsByIncrement({
		startDate,
		endDate,
		increment,
	});

	const data: WorkoutAnalytics = {
		currentVolume: getVolume(workouts),
		previousVolume: getVolume(previousWorkouts),
		increment,
	};

	return (
		<div className="space-y-4">
			<Header title="Analytics" Icon={ChartColumn} />
			<AnalyticsQuickStats data={data} />
		</div>
	);
}
