import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import type { WorkoutAnalytics } from "@/lib/types";
import { CardSizes } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export default function AnalyticsQuickStats({
	data,
}: {
	data: WorkoutAnalytics;
}) {
	const {
		count,
		totalSets,
		totalReps,
		week: { count: weekCount, totalSets: weekTotalSets, totalReps: weekTotalReps },
	} = data;

	return (
		<div className="grid grid-cols-6 gap-2">
			<Card className={CardSizes.SMALL}>
				<CardHeader>
					<Header title="Workouts" level={HeaderLevel.SUB_SECTION} />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-extrabold">{count}</div>
					<div className="flex items-center gap-1 text-green-500 font-bold">
						<p className="text-xs">
							<span className="font-bold">{weekCount}</span> this week
						</p>
						<TrendingUp size={16} />
					</div>
				</CardContent>
			</Card>
			<Card className={CardSizes.SMALL}>
				<CardHeader>
					<Header title="Total Sets" level={HeaderLevel.SUB_SECTION} />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-extrabold">{totalSets}</div>
					<div className="flex items-center gap-1 text-green-500 font-bold">
						<p className="text-xs">
							<span className="font-bold">{weekTotalSets}</span> this week
						</p>
						<TrendingUp size={16} />
					</div>
				</CardContent>
			</Card>
			<Card className={CardSizes.SMALL}>
				<CardHeader>
					<Header title="Total Reps" level={HeaderLevel.SUB_SECTION} />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-extrabold">{totalReps}</div>
					<div className="flex items-center gap-1 text-green-500 font-bold">
						<p className="text-xs">
							<span className="font-bold">{weekTotalReps}</span> this week
						</p>
						<TrendingUp size={16} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
