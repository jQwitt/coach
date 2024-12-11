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
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const CardSizes = {
	SMALL: "col-span-2 lg:col-span-1",
	MEDIUM: "col-span-3 lg:col-span-2",
	LARGE: "col-span-6 lg:col-span-4",
};

export default async function Analytics() {
	const today = new Date();
	const weekOffset = new Date(today);
	weekOffset.setDate(today.getDate() - 7);

	const workouts = await getWorkouts(); // TODO: make time range

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
							<SelectItem value="week">Week</SelectItem>
							<SelectItem value="month">Month</SelectItem>
							<SelectItem value="year">Year</SelectItem>
							<SelectItem value="all time">All time</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="grid grid-cols-6 gap-2">
				<Card className={CardSizes.SMALL}>
					<CardHeader>
						<Header title="Total Workouts" level={HeaderLevel.SUB_SECTION} />
					</CardHeader>
					{/* <CardContent>
						<div className="text-2xl font-bold">{statistics.totalWorkouts}</div>
						<p className="text-xs text-muted-foreground">
							<span className="font-bold">{`+${workouts.length}`}</span> this week
						</p>
					</CardContent> */}
				</Card>
				<Card className={CardSizes.SMALL}>
					<CardHeader>
						<Header title="Total Total Sets" level={HeaderLevel.SUB_SECTION} />
					</CardHeader>
					{/* <CardContent>
						<div className="text-2xl font-bold">{statistics.totalSets}</div>
						<p className="text-xs text-muted-foreground">
							<span className="font-bold">{`+${statistics.totalSets}`}</span> this week
						</p>
					</CardContent> */}
				</Card>
				<Card className={CardSizes.SMALL}>
					<CardHeader>
						<Header title="Total Reps" level={HeaderLevel.SUB_SECTION} />
					</CardHeader>
					{/* <CardContent>
						<div className="text-2xl font-bold">{statistics.totalReps}</div>
						<p className="text-xs text-muted-foreground">
							<span className="font-bold">{`+${statistics.totalReps}`}</span> this week
						</p>
					</CardContent> */}
				</Card>
				<Card className={CardSizes.MEDIUM}>
					<CardHeader>
						<Header title="Total Workouts by Weekday" level={HeaderLevel.SECTION} />
						<p className="text-sm text-muted-foreground">
							All yours workouts organized by day of the week logged.
						</p>
					</CardHeader>
				</Card>
				<Card className={CardSizes.MEDIUM}>
					<CardHeader>
						<Header title="Most Exercised Muscles" level={HeaderLevel.SECTION} />
					</CardHeader>
					<CardContent className="flex flex-row justify-center gap-6">
						<Body size="small" />
						<Body size="small" />
					</CardContent>
				</Card>
				<Card className={CardSizes.LARGE}>
					<CardHeader>
						<Header title="One Rep Max" level={HeaderLevel.SECTION} />
					</CardHeader>
					<CardContent className="flex flex-row justify-center gap-6">
						<p>test</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
