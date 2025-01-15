import type { LiveCoachFulfillmentFunction } from "@/lib/types/live-coach";
import { getExerciseForUserByName } from "../exercises";

export const viewAnalytics: LiveCoachFulfillmentFunction<{ url: string } | null> = async ({
	exercise,
}) => {
	if (!exercise.length) {
		return null;
	}

	const found = await getExerciseForUserByName({ exerciseName: exercise });

	if (found?.id) {
		return {
			url: `/analytics/exercise/${found.id}`,
		};
	}

	return null;
};
