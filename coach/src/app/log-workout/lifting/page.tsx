import Image from "next/image";
import Barbell from "../../../../public/images/dumbbell_black.png";

import WorkoutForm from "@/components/forms/workouts/workout-form";
import { getCurrentUser } from "@/app/actions";
import Header from "@/components/ui/header";

import WorkoutTimeline from "./components/workout-timeline";
import WorkoutStats from "./components/workout-stats";

export default async function LogWorkoutLifting() {
  const { id } = (await getCurrentUser()) ?? {};

  if (!id) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="text-primary mx-auto p-4 max-w-4xl">
      <div className="flex items-center">
        <Image
          src={Barbell}
          alt="dumbbell logo"
          width={48}
          height={48}
          className="rotate-45 -mt-1"
        />
        <Header title="Weights" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WorkoutForm userId={id} />
        <WorkoutTimeline />
        <WorkoutStats />
      </div>
    </div>
  );
}
