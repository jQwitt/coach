import { getExercise, getExerciseHistory } from "@/app/actions";
import Header from "@/components/ui/header";
import ExerciseHistory from "./components/exercise-history";
import WeightOverTimeGraph from "./components/weight-over-time";
import type { PageProps } from ".next/types/app/page";

export default async function AnalyticsExerciseLiftingPage({
	params,
}: {
	params: { exerciseId: string };
} & PageProps) {
	const { exerciseId } = await params;

	const exercise = await getExercise({ exerciseId });
	const history = await getExerciseHistory({ exerciseId });

	if (!exercise?.name) {
		return null;
	}

	return (
		<>
			<Header title={exercise?.name} />
			<WeightOverTimeGraph history={history} />
			<ExerciseHistory history={history} />
		</>
	);
}
