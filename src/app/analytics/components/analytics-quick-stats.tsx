import StatCard from "@/components/blocks/cards/stat-card";
import type { WorkoutAnalytics } from "@/lib/types";
import { formatIncrement } from "../helpers";

export default function AnalyticsQuickStats({
	data,
}: {
	data: WorkoutAnalytics;
}) {
	const { currentVolume, previousVolume, increment } = data;
	const { count, totalSets, totalReps } = currentVolume;
	const {
		count: previousCount,
		totalSets: previousTotalSets,
		totalReps: previousTotalReps,
	} = previousVolume ?? { count: 0, totalSets: 0, totalReps: 0 };

	return (
		<div className="grid grid-cols-6 gap-2">
			<StatCard
				className="col-span-2 lg:col-span-1"
				title="Workouts"
				count={count}
				highlight={increment ? `${count - previousCount} ${formatIncrement(increment)}` : ""}
			/>
			<StatCard
				className="col-span-2 lg:col-span-1"
				title="Total Sets"
				count={totalSets}
				highlight={
					increment ? `${totalSets - previousTotalSets} ${formatIncrement(increment)}` : ""
				}
			/>
			<StatCard
				className="col-span-2 lg:col-span-1"
				title="Total Reps"
				count={totalReps}
				highlight={
					increment ? `${totalReps - previousTotalReps} ${formatIncrement(increment)}` : ""
				}
			/>
		</div>
	);
}
