import { getExerciseHistory } from "@/app/actions";
import type { LiveCoachFulfillmentFunction } from "@/lib/types/live-coach";
import { getExerciseForUserByName } from "../exercises";

export const determineExerciseWeight: LiveCoachFulfillmentFunction<
	{ id: string; last: string; oneRepMax: string; recommended: string } | null
> = async ({ exercise }) => {
	if (!exercise.length) {
		return null;
	}

	const found = await getExerciseForUserByName({ exerciseName: exercise });
	if (!found?.id) {
		return null;
	}

	const exerciseId = String(found.id);
	const history = await getExerciseHistory({ exerciseId });
	const mostRecentWeightForTenReps = history.reduce((acc, { totalReps, maxWeight }) => {
		if (totalReps >= 10 && Number(maxWeight) > acc) {
			return Number(maxWeight);
		}
		return acc;
	}, 0);

	if (!mostRecentWeightForTenReps && history.length) {
		const recommended = String(Number(history[0]?.maxWeight) - 20);
		return {
			id: exerciseId,
			last: history[0].maxWeight,
			oneRepMax: "",
			recommended,
		};
	}

	const oneRepMax = Math.floor(mostRecentWeightForTenReps / 0.7498);
	const recommended = String(Math.ceil(oneRepMax * 0.75));
	return {
		id: exerciseId,
		last: String(mostRecentWeightForTenReps),
		oneRepMax: String(oneRepMax),
		recommended,
	};
};
