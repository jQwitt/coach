import { getDetailedWorkoutsForDates } from "@/app/actions";
import Header from "@/components/ui/header";
import type { WorkoutAnalytics } from "@/lib/types";
import { ChartColumn } from "lucide-react";
import AnalyticsQuickStats from "../../components/analytics-quick-stats";
import { parseDates } from "../../helpers/date-ranges";
import type { PageProps } from ".next/types/app/page";

export default async function AnalyticsDateRagePage({ params }: { dateRange: string } & PageProps) {
	const { dateRange } = await params;
	const { startDate, endDate } = parseDates(dateRange);

	const workouts = await getDetailedWorkoutsForDates({ startDate, endDate });

	const data: WorkoutAnalytics = {
		count: workouts.length,
		totalSets: 0,
		totalReps: 0,
	};

	for (const { totalSets, totalReps } of workouts) {
		data.totalSets += totalSets ?? 0;
		data.totalReps += totalReps ?? 0;
	}

	return (
		<div className="space-y-4">
			<Header title="Analytics" Icon={ChartColumn} />
			<AnalyticsQuickStats data={data} />
		</div>
	);
}
