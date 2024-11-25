"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Header, { HeaderLevel } from "@/components/ui/header";
import useWorkoutStore from "@/hooks/stores/use-workout";
import { Line, LineChart } from "recharts";
import { getRepsPerExercise, getSetsPerExercise } from "../helpers";

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
            <div className="flex h-full flex-col justify-center">
              <p className="text-center text-sm text-muted-foreground">
                Data will be shown here as you workout!
              </p>
            </div>
          )}
        </ChartContainer>
        <div className="my-4 w-full">
          <Header title="Views" level={HeaderLevel.SUB_SECTION} />
          <div className="flex flex-wrap gap-4">
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
            <p key={`${i}-${name}`} className="text-sm text-muted-foreground">
              {name}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
