import type { WorkoutLiftingData } from "@/lib/types";
import { Line, LineChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

export default function WorkoutHypertrophyRangeChart({ workout }: { workout: WorkoutLiftingData }) {
	const { exercises } = workout;

	const previousExercises = exercises.slice(0, -1);
	const data = previousExercises.map((exercise, index) => {
		const { sets } = exercise;

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
			className="h-1/2 w-full"
		>
			<LineChart data={data}>
				<Line type="monotone" dataKey="reps" stroke="var(--color-rate)" strokeWidth={2} />
				<ChartTooltip content={<ChartTooltipContent />} />
			</LineChart>
		</ChartContainer>
	);
}
