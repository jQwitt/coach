"use client";

import * as React from "react";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { heading } from "@/app/fonts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useWorkoutStore from "@/hooks/stores/use-workout";
import { Button } from "@/components/ui/button";
import { getRepsPerExercise, getSetsPerExercise } from "../helpers";
import Header, { HeaderLevel } from "@/components/ui/header";

enum Views {
  TOTAL_REPS_PER_EXERCISE = "total-reps-per-exercise",
  SETS_PER_EXERCISE = "sets-per-exercise",
}

type ChartViews = {
  [view in Views]: {
    label: string;
    dataKey: string;
    buttonLabel: string;
  };
};

const charts = {
  [Views.TOTAL_REPS_PER_EXERCISE]: {
    label: "Total Reps per Exercise",
    dataKey: "reps",
    buttonLabel: "Total Reps / Exercise",
  },
  [Views.SETS_PER_EXERCISE]: {
    label: "Sets per Exercise",
    dataKey: "sets",
    buttonLabel: "Sets / Exercise",
  },
} satisfies ChartViews;

export default function WorkoutTimeline() {
  const { workout } = useWorkoutStore();
  const [view, setView] = React.useState<Views>(Views.TOTAL_REPS_PER_EXERCISE);

  const data =
    view === Views.TOTAL_REPS_PER_EXERCISE
      ? getRepsPerExercise(workout)
      : view === Views.SETS_PER_EXERCISE
        ? getSetsPerExercise(workout)
        : [];

  React.useEffect(() => {
    console.log(view);
  }, [view]);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>
          <Header title="Workout Timeline" level={HeaderLevel.SECTION} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            rate: {
              label: charts[view]?.label,
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-1/2 w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            {data.length > 1 ? (
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey={charts[view].dataKey}
                  stroke="var(--color-rate)"
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            ) : (
              <div className="flex flex-col justify-center h-full">
                <p className="text-center text-muted-foreground text-sm">
                  Data will be shown here as you workout!
                </p>
              </div>
            )}
          </ResponsiveContainer>
        </ChartContainer>
        <div className="my-4 w-full">
          <Header title="Views" level={HeaderLevel.SUB_SECTION} />
          <div className="flex gap-4 flex-wrap">
            {Object.entries(charts).map(([key, { buttonLabel }]) => {
              return (
                <Button
                  key={`view-${key}`}
                  className="rounded-full"
                  variant="outline"
                  size="sm"
                  disabled={view === key}
                  onClick={() => setView(key as Views)}
                >
                  {buttonLabel}
                </Button>
              );
            })}
          </div>
        </div>
        <div>
          <Header title="Summary" level={HeaderLevel.SUB_SECTION} />
          {workout.exercises.map(({ name }, i) => (
            <p key={`${i}-${name}`} className="text-muted-foreground text-sm">
              {name}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
