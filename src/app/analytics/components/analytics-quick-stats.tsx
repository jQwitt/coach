import StatCard from "@/components/blocks/cards/stat-card";
import type { WorkoutAnalytics } from "@/lib/types";

export default function AnalyticsQuickStats({
	data,
}: {
	data: WorkoutAnalytics;
}) {
	const { count, totalSets, totalReps } = data;

	return (
		<div className="grid grid-cols-6 gap-2">
			<StatCard className="col-span-2 lg:col-span-1" title="Workouts" count={count} />
			<StatCard className="col-span-2 lg:col-span-1" title="Workouts" count={totalSets} />
			<StatCard className="col-span-2 lg:col-span-1" title="Workouts" count={totalReps} />
		</div>
	);
}
