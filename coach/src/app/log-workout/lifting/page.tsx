import { heading } from "@/app/fonts";

import WorkoutForm from "@/components/forms/workouts/workout-form";
import WorkoutTimeline from "./components/workout-timeline";
import WorkoutStats from "./components/workout-stats";
import { getCurrentUser } from "@/app/actions";

export default async function LogWorkoutLifting() {
  const { id } = (await getCurrentUser()) ?? {};

  if (!id) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="min-h-screen text-primary">
      <div className="container mx-auto p-4 max-w-4xl">
        <h3 className={`${heading.className} text-6xl text-primary m-4`}>
          Weightlifting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WorkoutForm userId={id} />
          <WorkoutTimeline />
          <WorkoutStats />
        </div>
      </div>
    </div>
  );
}
