"use client";

import { heading } from "@/app/fonts";
import type { WorkoutLiftingData } from "@/lib/types";
import { HelpCircle } from "lucide-react";
import { Line, LineChart, ReferenceArea, ReferenceLine, type TooltipProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import HypertophyIndicator from "../blocks/hypertophy-indicator";
import ActionButton from "../ui/buttons/action-button";
import { ChartContainer, ChartTooltip } from "../ui/chart";
import Header, { HeaderLevel } from "../ui/header";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const HYPERTROPHY_RANGE = 5;
const ENDURANCE_RANGE = 13;

export default function WorkoutHypertrophyRangeChart({ workout }: { workout: WorkoutLiftingData }) {
	const { exercises } = workout;

	let maxReps = 0;
	const previousExercises = exercises.slice(0, -1);
	const data = previousExercises.map((exercise, index) => {
		const { sets } = exercise;

		maxReps = Math.max(sets[0].reps, maxReps);

		return {
			index,
			reps: sets[0].reps,
		};
	});

	return (
		<div className="w-full relative">
			<ChartContainer
				config={{
					rate: {
						label: "Hypertrophy Range",
						color: "hsl(var(--chart-1))",
					},
				}}
				className="h-1/2"
			>
				<LineChart data={data}>
					<ReferenceArea
						y1={0}
						y2={HYPERTROPHY_RANGE}
						fill="none"
						fillOpacity={0.2}
						label="Strength Range"
					/>
					<ReferenceLine y={HYPERTROPHY_RANGE} stroke="gray" style={{ strokeDasharray: "3 3" }} />
					<ReferenceArea
						y1={HYPERTROPHY_RANGE}
						y2={ENDURANCE_RANGE}
						fill="none"
						fillOpacity={0.2}
						label="Hypertrophy Range"
					/>
					<ReferenceLine y={ENDURANCE_RANGE} stroke="gray" style={{ strokeDasharray: "3 3" }} />
					<ReferenceArea
						y1={ENDURANCE_RANGE}
						fill="none"
						fillOpacity={0.2}
						label="Endurance Range"
					/>

					<Line type="monotone" dataKey="reps" stroke="var(--color-rate)" strokeWidth={2} />

					<ChartTooltip content={(props) => <HypertrophyRangeChartToolTip {...props} />} />
				</LineChart>
			</ChartContainer>
			<Popover>
				<PopoverTrigger className="absolute bottom-0 right-0 flex items-center gap-1 text-muted-foreground text-xs opacity-90 hover:underline">
					More Info
					<HelpCircle size={14} />
				</PopoverTrigger>
				<PopoverContent className="text-sm text-primary p-2 space-y-1">
					<Header title="Hypertrophy" level={HeaderLevel.SUB_SECTION} />
					<p>
						When exercising, the number of repetitions performed directly influences the nature of
						muscle growth.
					</p>
					<p>
						There is an optimal number of repitions to promote
						<span className={`${heading.className} tracking-widest mx-1`}>Hypertrophy</span>-
						muscular growth targeting size.
					</p>
					<p>
						Less repetitions typically promote
						<span className={`${heading.className} tracking-widest mx-1`}>Strength</span>
					</p>
					<p>
						More repetitions typically promote
						<span className={`${heading.className} tracking-widest mx-1`}>Endurance</span>
					</p>
					<ActionButton className="w-full" text="Learn More" url="/learn" />
				</PopoverContent>
			</Popover>
		</div>
	);
}

function HypertrophyRangeChartToolTip({ active, payload }: TooltipProps<ValueType, NameType>) {
	if (active && payload && payload.length) {
		const reps = Number(payload[0].value ?? 0);

		return (
			<div className="rounded bg-white shadow-md border p-2 text-md">
				<HypertophyIndicator reps={reps} />
				<p>{payload[0].value} Reps</p>
			</div>
		);
	}

	return null;
}
