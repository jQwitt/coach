"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Header, { HeaderLevel } from "@/components/ui/header";
import { fromIso, getDateParts } from "@/lib/encoding";
import { Calendar, Clock } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function ExerciseHistory({
	history,
}: {
	history: {
		timeCompleted: string | null;
		totalSets: number;
		totalReps: number;
		maxWeight: string;
	}[];
}) {
	const maxWeightOverTime = [];

	for (const { timeCompleted, maxWeight } of history) {
		if (timeCompleted) {
			const { numericDayMonthYear } = getDateParts(fromIso(timeCompleted));

			maxWeightOverTime.push({
				date: numericDayMonthYear,
				weight: maxWeight,
			});
		}
	}

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<Header title="Max Weight Over Time" level={HeaderLevel.SECTION} />
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={{
							weight: {
								label: "Weight (kg)",
								color: "hsl(var(--chart-1))",
							},
						}}
						className="h-[250px]"
					>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={maxWeightOverTime}>
								<XAxis dataKey="date" tickFormatter={(date) => date} />
								<YAxis
									dataKey="weight"
									domain={["dataMin - 1", "dataMax + 1"]}
									tickFormatter={(value) => `${value} lbs.`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Line
									type="monotone"
									dataKey="weight"
									stroke="var(--color-weight)"
									strokeWidth={2}
									dot={{ fill: "var(--color-weight)", strokeWidth: 2 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</ChartContainer>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<Header title="By Date" level={HeaderLevel.SECTION} />
				</CardHeader>
				<CardContent>
					<div className="max-h-[48px] overflow-y-scroll">
						{history.map(({ timeCompleted, totalSets, totalReps, maxWeight }) => {
							const { numericDayMonthYear, hours } = timeCompleted
								? getDateParts(fromIso(timeCompleted))
								: {};

							return (
								<div key={timeCompleted} className="grid grid-cols-5 gap-2">
									{timeCompleted && (
										<div className="col-span-3 flex gap-2 text-muted-foreground text-sm items-center">
											<Calendar className="h-4 w-4" />
											<p>{numericDayMonthYear}</p>
											<Clock className="h-4 w-4" />
											<p>{hours}</p>
										</div>
									)}
									<p className="col-start-4 col-span-1">
										{totalSets} x {totalReps}
									</p>
									<p className="col-start-5 col-span-1">{maxWeight}lbs.</p>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
