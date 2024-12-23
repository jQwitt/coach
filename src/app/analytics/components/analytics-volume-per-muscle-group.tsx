import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { Progress } from "@/components/ui/progress";
import type { WorkoutsDetailedByDateReturn } from "@/lib/types";
import { HelpCircle, TriangleRight } from "lucide-react";
import Link from "next/link";

export default function AnalyticsVolumePerMuscleGroup({
	workouts,
}: { workouts: WorkoutsDetailedByDateReturn }) {
	const volumePerMuscleGroup: Record<string, number> = {
		Arms: 0,
		Shoulders: 0,
		Chest: 0,
		Back: 0,
		Legs: 0,
		Core: 0,
		FullBody: 0,
	};

	for (const { primaryTarget, totalSets } of workouts) {
		if (primaryTarget) {
			volumePerMuscleGroup[primaryTarget] += totalSets ?? 0;
		}
	}

	return (
		<div>
			<div className="flex items-center gap-2">
				<Header title="Volume by Muscle Group" level={HeaderLevel.SECTION} />
				<TriangleRight strokeWidth="3" />
			</div>
			<Card>
				<CardHeader>
					{Object.entries(volumePerMuscleGroup).map(([muscleGroup, volume]) => {
						const volumePercentage = Math.min(100, (volume / 20) * 100);
						const className = `${volumePercentage < 25 ? "[&>div]:bg-red-500" : volumePercentage < 50 ? "[&>div]:bg-orange-500" : volumePercentage < 75 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-green-500"}`;

						return (
							<div key={muscleGroup}>
								{muscleGroup}
								<div className="flex items-center gap-2 justify-between text-xs text-muted-foreground">
									{volume}
									<Progress value={volumePercentage} className={className} />
									20
								</div>
							</div>
						);
					})}
				</CardHeader>
				<CardFooter className="text-xs text-muted-foreground  group">
					<Link
						className="group-hover:underline flex flex-row items-center gap-1 justify-end"
						href="https://outlift.com/hypertrophy-training-volume/"
						target="_blank"
					>
						<p>
							Experts recommend between 12 and 20 sets per muscle group per week for optimum
							hypertrophy
						</p>
						<HelpCircle size={14} />
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
