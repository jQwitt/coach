import { getExerciseHistory } from "@/app/actions";
import ExerciseHistory from "./components/exercise-history";
import type { PageProps } from ".next/types/app/page";

export default async function AnalyticsExerciseLiftingPage({
	params,
}: {
	params: { exerciseId: string };
} & PageProps) {
	const { exerciseId } = await params;

	const history = await getExerciseHistory({ exerciseId });

	return (
		<>
			<ExerciseHistory history={history} />
		</>
	);
}
