import { getExercises, getWorkouts } from "@/app/actions";
import ExerciseList from "./components/exercise-list";
import QuickActions from "./components/quick-actions";
import WorkoutsList from "./components/workouts-list";

export default async function Dashboard() {
	const workouts = await getWorkouts();
	const exercises = await getExercises();

	return (
		<div className="space-y-4">
			<QuickActions />
			<ExerciseList exercises={exercises} />
			<WorkoutsList workouts={workouts} />
		</div>
	);
}
