import { getExerciseHistory } from "@/app/actions";
import type { LiveCoachFulfillmentFunction } from "@/lib/types/live-coach";
import { getExerciseForUserByName } from "../exercises";

export const determineExerciseWeight: LiveCoachFulfillmentFunction<
	{ id: string; isOrm: boolean; last: string; oneRepMax: number | null } | null
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
		return { id: exerciseId, isOrm: false, last: history[0].maxWeight, oneRepMax: null };
	}

	const oneRepMax = Math.floor(mostRecentWeightForTenReps / 0.7498);
	return { id: exerciseId, isOrm: true, last: String(mostRecentWeightForTenReps), oneRepMax };
};
