import { getWorkouts } from "@/app/actions";
import Header, { HeaderLevel } from "@/components/ui/header";
import QuickActions from "./components/quick-actions";
import WorkoutsList from "./components/workouts-list";

export default async function Dashboard() {
	const workouts = await getWorkouts();

	return (
		<div className="space-y-4">
			<QuickActions />
			<Header title="Recent Workouts" level={HeaderLevel.SECTION} className="my-1" />
			<WorkoutsList workouts={workouts} />
			{workouts.length === 0 && (
				<div className="my-5 w-full text-center">
					<p className="text-sm text-muted-foreground">Future workouts will appear here!</p>
				</div>
			)}
		</div>
	);
}
