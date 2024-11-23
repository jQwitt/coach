"use client";

import * as React from "react";
import { X, Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExerciseSet } from "@/lib/types";
import { heading } from "@/app/fonts";
import useWorkoutStore from "@/hooks/stores/use-workout";
import Header, { HeaderLevel } from "@/components/ui/header";

export default function SetsForm({
  index,
  addSet,
  removeSet,
  updateSet,
}: {
  index: number;
  addSet: (index: number) => void;
  removeSet: (index: number) => void;
  updateSet: (
    index: number,
    setIndex: number,
    value: Partial<ExerciseSet>
  ) => void;
}) {
  const { workout } = useWorkoutStore();
  const data = workout.exercises[index].sets;

  return (
    <div className="space-y-2">
      <Header title="Sets" level={HeaderLevel.SUB_SECTION} />
      <div className="grid grid-cols-6">
        <p className="col-span-2">Reps</p>
        <p className="col-span-2 col-start-4">Weight</p>
      </div>
      {data.map((set, setIndex) => {
        const { reps, weight } = set;

        return (
          <div
            key={`exercise=-${index}-set-${setIndex}`}
            className="grid grid-cols-6"
          >
            <Label
              className="hidden"
              htmlFor={`exercise-${index}-set-${setIndex}-reps`}
            >
              Reps
            </Label>
            <Input
              id={`exercise-${index}-set-${setIndex}-reps`}
              type="text"
              inputMode="numeric"
              placeholder="0"
              className="col-span-2"
              value={reps}
              onChange={(e) =>
                updateSet(index, setIndex, { reps: Number(e.target.value) })
              }
            />
            <div className="col-span-1 text-center self-center">
              <X className="w-4 h-4 mx-auto" />
            </div>
            <Label
              className="hidden"
              htmlFor={`exercise-${index}-set-${setIndex}-weight`}
            >
              Weight
            </Label>
            <Input
              id={`exercise-${index}-set-${setIndex}-weight`}
              type="text"
              inputMode="numeric"
              placeholder="0"
              className="col-span-2"
              value={weight}
              onChange={(e) =>
                updateSet(index, setIndex, { weight: Number(e.target.value) })
              }
            />
          </div>
        );
      })}
      <div className="mt-2 w-full">
        <Button
          className="w-1/2"
          disabled={data.length >= 6}
          type="button"
          variant="outline"
          onClick={() => addSet(index)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          className="w-1/2"
          disabled={data.length <= 1}
          type="button"
          variant="outline"
          onClick={() => removeSet(index)}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
