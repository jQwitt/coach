"use client";

import { heading } from "@/app/fonts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useWorkoutStore from "@/hooks/stores/use-workout";

export default function WorkoutStats() {
  const { workout } = useWorkoutStore();
  const exerciseStats = {
    total: workout.exercises.length,
    averageSets:
      workout.exercises.reduce(
        (acc, exercise) => acc + exercise.sets.length,
        0,
      ) / workout.exercises.length,
  };

  return (
    <Card className="shadow-md md:col-span-2">
      <CardHeader>
        <CardTitle>
          <h5 className={`${heading.className} my-1 text-3xl text-primary`}>
            Quick Stats
          </h5>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            Total Exercises:
            <span className="mx-1 font-semibold">{exerciseStats.total}</span>
          </p>
          <p>
            Average Sets per Workout:
            <span className="mx-1 font-semibold">
              {exerciseStats.averageSets}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
