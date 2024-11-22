"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { heading } from "@/app/fonts";

import useWorkoutStore from "@/hooks/stores/use-workout";
import WorkoutForm from "@/components/forms/workouts/workout-form";

export default function LogWorkoutLifting() {
  const { workout } = useWorkoutStore();
  const exerciseStats = {
    total: workout.exercises.length,
    averageSets: workout.exercises.reduce(
      (acc, exercise) => acc + exercise.sets.length,
      0
    ),
  };

  return (
    <div className="min-h-screen text-primary">
      <div className="container mx-auto p-4 max-w-4xl">
        <h3 className={`${heading.className} text-6xl text-primary m-4`}>
          Weightlifting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="mt-6 shadow-md">
            <CardContent>
              <WorkoutForm onSubmit={(data) => console.log(data)} />
            </CardContent>
          </Card>

          {/* TIMELINE */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>
                <h5
                  className={`${heading.className} text-3xl text-primary my-1`}
                >
                  Your workout timeline
                </h5>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 ">list exercises</div>
            </CardContent>
          </Card>

          {/* STATS */}
          <Card className="shadow-md md:col-span-2">
            <CardHeader>
              <CardTitle>
                <h5
                  className={`${heading.className} text-3xl text-primary my-1`}
                >
                  Quick Stats
                </h5>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 ">
                <p>
                  Total Exercises:
                  <span className="font-semibold mx-1">
                    {exerciseStats.total}
                  </span>
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
        </div>
      </div>
    </div>
  );
}
