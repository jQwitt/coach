import { getExercise, getExerciseHistory } from "@/app/actions";
import Header from "@/components/ui/header";
import ExerciseHistory from "./components/exercise-history";
import SuggestOneRepMax from "./components/suggest-one-rep-max";
import WeightOverTimeGraph from "./components/weight-over-time";

export default async function AnalyticsExerciseLiftingPage({
	params,
}: {
	params: { exerciseId: string[] };
}) {
	const { exerciseId } = params;

	const exercise = await getExercise({ exerciseId: exerciseId[0] });
	const history = await getExerciseHistory({ exerciseId: exerciseId[0] });

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
