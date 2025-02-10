import { ExerciseCard } from "@/components/blocks/cards/exercise-card";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const generateExerciseCards = (exercises: any[]): React.ReactNode[] => {
	const exerciseCards: React.ReactNode[] = [];

	for (const { name, description } of exercises) {
		exerciseCards.push(<ExerciseCard key={name} name={name} description={description} />);
	}
	return exerciseCards;
};
