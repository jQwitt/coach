import { getDetailedWorkoutsForDates, getPreviousDetailedWorkoutsByIncrement } from "@/app/actions";
import type { WorkoutAnalytics } from "@/lib/types";
import AnalyticsContrastExercises from "../../components/analytics-contrast-exercises";
import AnalyticsQuickStats from "../../components/analytics-quick-stats";
import AnalyticsVolumePerMuscleGroup from "../../components/analytics-volume-per-muscle-group";
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
			<AnalyticsQuickStats data={data} />
			{increment === "week" && <AnalyticsVolumePerMuscleGroup workouts={workouts} />}
			<AnalyticsContrastExercises workouts={workouts} />
		</div>
	);
}
