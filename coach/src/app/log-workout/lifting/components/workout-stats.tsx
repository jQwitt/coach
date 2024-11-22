"use client";

import { heading } from "@/app/fonts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useWorkoutStore from "@/hooks/stores/use-workout";

export default function WorkoutStats() {
  const { workout } = useWorkoutStore();
  const exerciseStats = {
    total: workout.exercises.length,
    averageSets:
      workout.exercises.reduce(
        (acc, exercise) => acc + exercise.sets.length,
        0
      ) / workout.exercises.length,
  };

  return (
    <Card className="shadow-md md:col-span-2">
      <CardHeader>
        <CardTitle>
          <h5 className={`${heading.className} text-3xl text-primary my-1`}>
            Quick Stats
          </h5>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 ">
          <p>
            Total Exercises:
            <span className="font-semibold mx-1">{exerciseStats.total}</span>
          </p>
          <p>
            Average Sets per Workout:
            <span className="font-semibold mx-1">
              {exerciseStats.averageSets}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
