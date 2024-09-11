"use client";

import React from "react";

import { Button } from "@/components/common";

import { useWorkoutStore } from "@/data/stores/workout";
import { ExerciseInput } from "@/components";
import Link from "next/link";

export default function WorkoutPage() {
  const { addExercise, exercises } = useWorkoutStore();

  const [name, setName] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSubmit = () => {
    if (name !== "") {
      addExercise({ name, sets: [] });
      setName("");
    }
  };

  return (
    <div className="bg-background w-full px-4">
      <div className="mt-4 flex justify-between items-center">
        <h2 className="text-4xl tracking-wider">Workout</h2>
        <div>
          <Link href="/dashboard">View on Dashboard</Link>
        </div>
      </div>
      <div className="flex flex-col gap-1 my-4"></div>
      {exercises.map((exercise, i) => (
        <ExerciseInput key={i} exercise={exercise} />
      ))}

      <div className="flex flex-row justify-end gap-4">
        <input
          type="text"
          className="grow rounded-md bg-content focus:bg-contentLight text-text px-4"
          onChange={(e) => handleChange(e)}
          value={name}
        />
        <Button text="Add exercise" onClick={() => handleSubmit()} />
      </div>
    </div>
  );
}
