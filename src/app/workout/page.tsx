"use client";

import React from "react";

import { Button } from "@/components/common";

import { useWorkoutStore } from "@/data/stores/workout";
import { ExerciseInput } from "@/components";

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
  const day = new Date().toLocaleString();

  return (
    <div className="bg-background w-full px-4">
      <h2 className="mt-4 text-4xl tracking-wider">Workout: {`${day}`}</h2>
      <div className="flex flex-col gap-1 my-4">
        {exercises.map((exercise, i) => (
          <ExerciseInput key={i} exercise={exercise} />
        ))}
      </div>
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
