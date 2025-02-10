import type { MuscleGroupString } from "@/lib/types";
import type { LiveCoachFulfillmentFunction } from "@/lib/types/live-coach";
import { MatchableMuscleGroups, capitalize } from "@/lib/utils";
import { createExerciseList } from "@/services/ai/suggest-exercise";

type SuggestedExerciseResult = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	exercises: undefined | any[];
};

export const suggestExercise: LiveCoachFulfillmentFunction<
	SuggestedExerciseResult | undefined
> = async ({ muscleGroup }) => {
	const result: SuggestedExerciseResult = { exercises: [] };
	if (!muscleGroup.length) {
		return result;
	}

	const match = muscleGroup.match(MatchableMuscleGroups);
	if (!match) {
		return result;
	}

	const query = capitalize(match[0]);
	const exercises = await createExerciseList(query);

	if (!exercises) {
		return result;
	}

	result.exercises = exercises;
	return result;
};
