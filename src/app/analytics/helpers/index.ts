import type { TimeSpan, WorkoutVolume, WorkoutsDetailedByDateReturn } from "@/lib/types";

export function getVolume(workouts: WorkoutsDetailedByDateReturn): WorkoutVolume {
	const data = {
		count: workouts.length,
		totalSets: 0,
		totalReps: 0,
	};

	for (const { totalSets, totalReps } of workouts) {
		data.totalSets += totalSets ?? 0;
		data.totalReps += totalReps ?? 0;
	}

	return data;
}

export function formatIncrement(span: TimeSpan | null) {
	switch (span) {
		case "day":
			return "today";
		case "week":
			return "this week";
		case "month":
			return "this month";
		case "year":
			return "this year";
		default:
			return "";
	}
}
