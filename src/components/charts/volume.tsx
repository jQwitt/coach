"use client";

import { heading } from "@/app/fonts";
import { format } from "@/components/charts/helpers";
import type { WorkoutLiftingData } from "@/lib/types";
import * as React from "react";
import { Line, LineChart, type TooltipProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { ChartContainer, ChartTooltip } from "../ui/chart";

interface VolumeChartProps {
	workout: Omit<WorkoutLiftingData, "date">;
}

export default function VolumeChart({ workout: { exercises } }: VolumeChartProps) {
	const data = React.useMemo(() => format(exercises.slice(0, -1)), [exercises]);

	return (
		<>
			<ChartContainer
				config={{
					rate: {
						label: "WorkoutVolume",
						color: "hsl(var(--chart-1))",
					},
				}}
				className="h-1/2 w-full"
			>
				<LineChart data={data}>
					<Line type="monotone" dataKey={"sets"} stroke="hsl(var(--chart-2))" strokeWidth={2} />
					<Line type="monotone" dataKey={"reps"} stroke="hsl(var(--chart-1))" strokeWidth={2} />
					<ChartTooltip content={(props) => <VolumeChartToolTip {...props} />} />
				</LineChart>
			</ChartContainer>
		</>
	);
}

function VolumeChartToolTip({ active, payload }: TooltipProps<ValueType, NameType>) {
	if (active && payload && payload.length) {
		const { name, reps, maxWeight, sets } = payload[0].payload;

		return (
			<div className="rounded bg-white shadow-md border p-2 text-md">
				<p className={`${heading.className} text-lg`}>{name}</p>
				<p>
					{`${sets} set${sets > 1 ? "s" : ""}`} of {`${reps} rep${reps > 1 ? "s" : ""}`}
				</p>
				<p className="font-semibold">{maxWeight} lbs.</p>
			</div>
		);
	}

	return null;
}
