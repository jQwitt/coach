"use client";

import { Card, CardContent } from "@/components/ui/card";
import { heading } from "@/app/fonts";

import WorkoutForm from "@/components/forms/workouts/workout-form";
import WorkoutTimeline from "./components/workout-timeline";
import WorkoutStats from "./components/workout-stats";

export default function LogWorkoutLifting() {
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

          <WorkoutTimeline />
          <WorkoutStats />
        </div>
      </div>
    </div>
  );
}
