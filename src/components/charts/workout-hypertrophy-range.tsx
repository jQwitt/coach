import type { WorkoutLiftingData } from "@/lib/types";
import { Line, LineChart, ReferenceArea, ReferenceLine, type TooltipProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import HypertophyIndicator from "../blocks/hypertophy-indicator";
import { ChartContainer, ChartTooltip } from "../ui/chart";

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
				<ReferenceArea y1={ENDURANCE_RANGE} fill="none" fillOpacity={0.2} label="Endurance Range" />

				<Line type="monotone" dataKey="reps" stroke="var(--color-rate)" strokeWidth={2} />

				<ChartTooltip content={(props) => <HypertrophyRangeChartToolTip {...props} />} />
			</LineChart>
		</ChartContainer>
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
