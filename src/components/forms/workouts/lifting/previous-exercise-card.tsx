import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import type { ExerciseData } from "@/lib/types";
import { X } from "lucide-react";

export default function PreviousExerciseCard({
	exercise,
	onRemove,
	...props
}: { exercise: ExerciseData; onRemove: () => void }) {
	const { name, sets } = exercise;

	return (
		<Card {...props}>
			<CardContent className="group flex flex-col justify-between gap-1 -m-2 mt-2 relative pr-16">
				<Button
					className="absolute -top-3 right-1 hidden group-hover:flex"
					variant="secondary"
					size="icon"
					onClick={onRemove}
					type="button"
				>
					<X />
				</Button>
				<Header title={name} level={HeaderLevel.SECTION} />
				<div>
					{sets.map(({ count, reps, weight }, index) => (
						<div key={`set-${index}`}>
							<p>
								{count} x {reps} @ {weight}
							</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
