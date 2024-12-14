import { heading } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import type { ExerciseData } from "@/lib/types";
import { ChevronsUp, X } from "lucide-react";

export default function PreviousExerciseCard({
	exercise,
	onRemove,
	...props
}: { exercise: ExerciseData; onRemove: () => void }) {
	const { name, sets } = exercise;

	const maxReps = sets.reduce((acc, { reps }) => Math.max(acc, reps), 0);
	const isHypertrophic = maxReps > 5 && maxReps < 13;

	return (
		<Card {...props} className="w-[40%]">
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
				<div>
					<Header title={name} level={HeaderLevel.SECTION} />
				</div>
				<div className="p-1">
					{sets.map(({ count, reps, weight }, index) => (
						<p key={`set-${index}`} className="text-sm text-muted-foreground">
							{count} x {reps} @ {weight}
						</p>
					))}
				</div>
				<div className="flex items-center justify-start">
					<ChevronsUp
						className={`-mt-3 text-${isHypertrophic ? "green-500" : "red-500"}`}
						size={16}
						strokeWidth={2}
					/>
					<p
						className={`${heading.className} tracking-wider text-${isHypertrophic ? "green-500" : "red-500"}`}
					>
						{isHypertrophic ? "Hypertophy" : "Strength"}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
