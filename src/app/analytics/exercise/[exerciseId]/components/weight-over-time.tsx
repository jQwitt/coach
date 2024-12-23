"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import Header, { HeaderLevel } from "@/components/ui/header";
import { fromIso, getDateParts } from "@/lib/encoding";
import type { ExerciseHistory } from "@/lib/types";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function WeightOverTimeGraph({ history }: { history: ExerciseHistory }) {
	const maxWeightOverTime = [];
	let upperLimit = 0;

	for (const { timeCompleted, maxWeight } of history) {
		if (timeCompleted) {
			const { numericDayMonthYear } = getDateParts(fromIso(timeCompleted));

			if (Number(maxWeight) > upperLimit) {
				upperLimit = Number(maxWeight);
			}

			maxWeightOverTime.push({
				date: numericDayMonthYear,
				weight: maxWeight,
			});
		}
	}

	return (
		<Card>
			<CardHeader>
				<Header title="Max Weight Over Time" level={HeaderLevel.SECTION} />
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={{
						weight: {
							label: "Weight (lbs.)",
							color: "hsl(var(--chart-1))",
						},
					}}
					className="h-[200px] w-full"
				>
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={maxWeightOverTime}>
							<XAxis dataKey="date" tickFormatter={(date) => date} />
							<YAxis
								dataKey="weight"
								domain={[0, upperLimit + 60]}
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
	);
}
