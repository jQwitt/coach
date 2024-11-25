import Image from "next/image";
import Barbell from "../../../../public/images/dumbbell_black.png";

import { Bike } from "lucide-react";

import WorkoutForm from "@/components/forms/workouts/workout-form";
import { getCurrentUser } from "@/app/actions";
import Header from "@/components/ui/header";

export default async function LogWorkoutLifting() {
  const { id } = (await getCurrentUser()) ?? {};

  if (!id) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="text-primary mx-auto p-4 max-w-4xl">
      <div className="flex items-center">
        <Bike className="-mt-1 font-bold" size={48} />
        <Header title="Cycling" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">Coming soon!</div>
    </div>
  );
}
