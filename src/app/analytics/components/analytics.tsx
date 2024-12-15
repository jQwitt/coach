"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { WorkoutAnalytics } from "@/lib/types";
import AnalyticsQuickStats from "./analytics-quick-stats";

export default function Analytics({ data }: { data: WorkoutAnalytics }) {
	return (
		<div>
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
			<AnalyticsQuickStats data={data} />

			{/* <div className="grid grid-cols-6 gap-2">
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
			</div> */}
		</div>
	);
}
