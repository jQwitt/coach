import { getExercisesForWorkout, getWorkout } from "@/app/actions";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { formatDuration, formatHours, fromIso, getDateParts, getLongWeekday } from "@/lib/encoding";
import { CalendarDays, Clock, Hash, Hourglass } from "lucide-react";
import PageControls from "./components/page-controls";
import WorkoutExerciseList from "./components/workout-exercise-list";

type Params = Promise<{ id: string }>;

export default async function WorkoutAnalyticsPage(props: { params: Params }) {
	const { id } = await props.params;
	const workout = await getWorkout({ workoutId: id });
	const workoutExercises = await getExercisesForWorkout({ workoutId: id });

	if (!workout || !workout.name) {
		return <div>Error</div>;
	}

	const { name, timeCompleted, duration } = workout;
	const { month, weekday, hours, numericDay, year } = getDateParts(fromIso(timeCompleted));

	return (
		<div className="space-y-4">
			<PageControls />
			<Header title={name} level={HeaderLevel.PAGE} />
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<CalendarDays size={16} />
					<p>{`${getLongWeekday(weekday)}, ${month} ${numericDay} ${year}`}</p>
				</div>
				<div className="flex items-center gap-2">
					<Clock size={16} />
					<p>{formatHours(hours)}</p>
				</div>
			</div>
			<Header title="Insights" level={HeaderLevel.SECTION} />
			<div className="grid grid-cols-3 md:grid-cols-6 gap-2 items-stretch">
				<Card className="relative overflow-clip col-span-1">
					<CardHeader className="flex flex-row items-center gap-2">
						<Header title="Duration" level={HeaderLevel.SUB_SECTION} />
					</CardHeader>
					<CardFooter>
						<p className="text-3xl font-semibold">{formatDuration(duration)}</p>
					</CardFooter>
					<div className="absolute -right-4 -bottom-4 opacity-10">
						<Hourglass size={96} />
					</div>
				</Card>
				<Card className="relative overflow-clip col-span-1">
					<CardHeader className="flex flex-row items-center gap-2">
						<Header title="Exercises" level={HeaderLevel.SUB_SECTION} />
					</CardHeader>
					<CardFooter>
						<p className="text-3xl font-semibold">{workoutExercises?.length}</p>
					</CardFooter>
					<div className="absolute -right-4 -bottom-4 opacity-10">
						<Hash size={96} />
					</div>
				</Card>
			</div>
			<Header title="Exercises" level={HeaderLevel.SECTION} />
			<div>
				<WorkoutExerciseList exercises={workoutExercises} />
			</div>
		</div>
	);
}
