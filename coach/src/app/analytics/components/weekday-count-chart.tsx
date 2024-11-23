"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ResponsiveContainer, Bar, BarChart } from "recharts";

export default function WeekdayCountChart({
  data,
}: {
  data: { day: string; count: number }[];
}) {
  return (
    <ChartContainer
      config={{
        steps: {
          label: "day",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <Bar dataKey="steps" fill="var(--color-steps)" />
          <ChartTooltip content={<ChartTooltipContent labelKey="day" />} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
