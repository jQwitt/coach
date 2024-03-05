"use client";

import React from "react";

import { useWorkoutStore } from "@/data/stores/workout";
import { Exercise, FunctionComponent, Set } from "@/types";

import { Button, Card } from "./common";
import { ProgressChart } from "./progress-chart";

export interface ExerciseInputProps {
  exercise: Exercise;
}

export const ExerciseInput: FunctionComponent<ExerciseInputProps> = ({
  exercise,
}) => {
  const { addSetForExercise } = useWorkoutStore();
  const { name, sets } = exercise;

  const [reps, setReps] = React.useState(0);
  const [weight, setWeight] = React.useState(0);

  const handleClick = () => {
    const toAdd: Set = { reps, weight };
    if (reps && weight) {
      addSetForExercise(name, toAdd);
    }
  };

  return (
    <Card>
      <h4 className="font-bold text-lg">{name}</h4>
      <div className="flex flex-row items-start gap-2">
        <div className="grow flex flex-col my-4">
          {sets.map((set, i) => {
            const { reps, weight } = set;
            return <p key={i}>{`${reps} x ${weight}`}</p>;
          })}
        </div>
        <ProgressChart exercise={exercise} />
      </div>
      <div className="flex flex-row justify-end items-center gap-4">
        <span className="grow flex flex-row items-center gap-2">
          <label>Reps</label>
          <input
            type="number"
            className=" rounded-md bg-content focus:bg-contentLight text-text p-2"
            onChange={(e) => setReps(e.target.valueAsNumber)}
            value={reps}
          ></input>
        </span>
        <span className="grow flex flex-row items-center gap-2">
          <label>Weight</label>
          <input
            type="number"
            className=" rounded-md bg-content focus:bg-contentLight text-text p-2"
            onChange={(e) => setWeight(e.target.valueAsNumber)}
            value={weight}
          ></input>
        </span>
        <Button text="Add set" onClick={() => handleClick()} />
      </div>
    </Card>
  );
};
