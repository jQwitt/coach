"use client";

import { Button } from "@/components/ui/button";
import ActionButton from "@/components/ui/buttons/action-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import type { ExerciseHistory } from "@/lib/types";
import { CircleHelp } from "lucide-react";
import Link from "next/link";

export default function SuggestOneRepMax({ history }: { history: ExerciseHistory }) {
	const mostRecentWeightForTenReps = history.reduce((acc, { totalReps, maxWeight }) => {
		if (totalReps >= 10 && Number(maxWeight) > acc) {
			return Number(maxWeight);
		}
		return acc;
	}, 0);
	const oneRepMax = Math.floor(mostRecentWeightForTenReps / 0.7498);

	return (
		<Card>
			<CardHeader>
				<Header title="One Rep Max" level={HeaderLevel.SECTION} />
			</CardHeader>
			<CardContent className="text-primary text-sm relative">
				{mostRecentWeightForTenReps ? (
					<div>
						<p>
							Based on your most recent 10 rep set of {mostRecentWeightForTenReps} lbs., we estimate
							your 1RM to be:
						</p>
						<div>
							<p className="text-center w-full text-primary font-bold text-3xl mb-6">
								{oneRepMax} lbs.
							</p>
						</div>
						<div className="absolute bottom-0 right-0">
							<Button variant="link" asChild>
								<Link
									href="https://personaltrainertoday.com/calculating-a-clients-1rm#:~:text=The%20Brzycki%20Equation&text=The%20Brzycki%20formula%20can%20function,%E2%80%93%20(0.0278%20x%20r)%5D."
									target="_blank"
									className="text-xs"
								>
									Learn how this is calculated
									<CircleHelp size={10} />
								</Link>
							</Button>
						</div>
					</div>
				) : (
					<div className="flex flex-col justify-between gap-6">
						<p className="text-primary self-start">
							Looks like you haven't logged this exercise for 10 or more reps yet.
						</p>
						<ActionButton
							text="Determine your potential 1RM"
							url="/live-coach?intent='determine exercise weight'"
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
