import { getExercise, getExerciseHistory } from "@/app/actions";
import Header from "@/components/ui/header";
import ExerciseHistory from "./components/exercise-history";
import SuggestOneRepMax from "./components/suggest-one-rep-max";
import WeightOverTimeGraph from "./components/weight-over-time";

export default async function AnalyticsExerciseLiftingPage({
	params,
}: {
	params: { exerciseId: string };
}) {
	const { exerciseId } = params;

	const exercise = await getExercise({ exerciseId });
	const history = await getExerciseHistory({ exerciseId });

	if (!exercise?.name) {
		return null;
	}

	return (
		<>
			<Header title={exercise?.name} />
			<WeightOverTimeGraph history={history} />
			<SuggestOneRepMax history={history} />
			<ExerciseHistory history={history} />
		</>
	);
}
