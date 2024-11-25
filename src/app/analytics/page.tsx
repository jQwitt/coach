import { ChartColumn } from "lucide-react";

import { getWorkouts } from "@/app/actions";
import Body from "@/components/blocks/body-highlighter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const CardSizes = {
	SMALL: "col-span-1 md:col-span-2",
};

export default async function Analytics() {
	const workouts = await getWorkouts();

	const statistics = {
		totalWorkouts: workouts.length,
		totalSets: 0,
		totalReps: 0,
	};

	for (const workout of workouts) {
		const { name, date, exercises } = workout;

		for (const exercise of exercises) {
			for (const set of exercise.sets) {
				statistics.totalSets += set.count;
				statistics.totalReps += set.reps;
			}
		}
	}

	return (
		<div className="space-y-4">
			<Header title="Analytics" Icon={ChartColumn} />
			<div className="fixed bottom-3 left-4 sm:left-6 md:relative md:left-0 bg-background">
				<Select>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder="Day" defaultValue={"day"} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="day">Day</SelectItem>
							<SelectItem value="month">Month</SelectItem>
							<SelectItem value="year">Year</SelectItem>
							<SelectItem value="all time">All time</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="grid grid-cols-3 md:grid-cols-8 gap-2">
				<Card className={CardSizes.SMALL}>
					<CardHeader>
						<Header title="Total Workouts" level={HeaderLevel.SUB_SECTION} />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{statistics.totalWorkouts}</div>
						<p className="text-xs text-muted-foreground">
							<span className="font-bold">{`+${workouts.length}`}</span> this week
						</p>
					</CardContent>
				</Card>
				<Card className={CardSizes.SMALL}>
					<CardHeader>
						<Header title="Total Total Sets" level={HeaderLevel.SUB_SECTION} />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{statistics.totalSets}</div>
						<p className="text-xs text-muted-foreground">
							<span className="font-bold">{`+${statistics.totalSets}`}</span> this week
						</p>
					</CardContent>
				</Card>
				<Card className={CardSizes.SMALL}>
					<CardHeader>
						<Header title="Total Reps" level={HeaderLevel.SUB_SECTION} />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{statistics.totalReps}</div>
						<p className="text-xs text-muted-foreground">
							<span className="font-bold">{`+${statistics.totalReps}`}</span> this week
						</p>
					</CardContent>
				</Card>
			</div>
			<div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<Header title="Total Workouts by Weekday" level={HeaderLevel.SECTION} />
						<p className="text-sm text-muted-foreground">
							All yours workouts organized by day of the week logged.
						</p>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<Header title="Most Exercised Muscles" level={HeaderLevel.SECTION} />
					</CardHeader>
					<CardContent className="flex flex-row justify-center gap-6">
						<Body size="small" />
						<Body size="small" />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
