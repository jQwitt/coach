import { getWorkoutById } from "@/app/actions";
import Header, { HeaderLevel } from "@/components/ui/header";
import { fromIso, getDateParts } from "@/lib/encoding";
import { Calendar, CalendarDays, Clock } from "lucide-react";
import WorkoutSummaryCard from "../components/workout-summary-card";
import type { PageProps } from ".next/types/app/page";

export default async function WorkoutAnalyticsPage({
	params,
}: {
	params: { workoutId: string };
} & PageProps) {
	const { workoutId } = await params;
	const workout = await getWorkoutById({ workoutId: Number(workoutId) });

	if (!workout || !workout.name) {
		return <div>Error</div>;
	}

	const { name, date, exercises } = workout;
	const { month, weekday, hours } = getDateParts(fromIso(date ?? ""));

	return (
		<div>
			<Header title={name} level={HeaderLevel.PAGE} />
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<Calendar size={16} />
					<p>{month}</p>
				</div>
				<div className="flex items-center gap-2">
					<CalendarDays size={16} />
					<p>{weekday}</p>
				</div>
				<div className="flex items-center gap-2">
					<Clock size={16} />
					<p>{`${hours[0] === "0" ? "" : hours[0]}${hours.slice(1)}`}</p>
				</div>
				<WorkoutSummaryCard exercises={exercises} />
			</div>
		</div>
	);
}
