import Image from "next/image";
import Barbell from "../../../../public/images/dumbbell_black.png";

import { getCurrentUser } from "@/app/actions";
import WorkoutForm from "@/components/forms/workouts/workout-form";
import Header from "@/components/ui/header";

import WorkoutStats from "./components/workout-stats";
import WorkoutTimeline from "./components/workout-timeline";

export default async function LogWorkoutLifting() {
  const { id } = (await getCurrentUser()) ?? {};

  if (!id) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-4 text-primary">
      <div className="flex items-center">
        <Image
          src={Barbell}
          alt="dumbbell logo"
          width={48}
          height={48}
          className="-mt-1 rotate-45"
        />
        <Header title="Weights" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <WorkoutForm userId={id} />
        <WorkoutTimeline />
        <WorkoutStats />
      </div>
    </div>
  );
}
