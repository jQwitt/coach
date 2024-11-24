"use client";

import * as React from "react";
import { X, Plus, Minus, Weight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExerciseSet } from "@/lib/types";
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

  const handleUpdate = (
    setIndex: number,
    { key, value }: { key: keyof Omit<ExerciseSet, "metadata">; value: string }
  ) => {
    const cast = Number(value);
    if (!isNaN(cast)) {
      updateSet(index, setIndex, {
        [key]: cast,
      });
    }
  };

  return (
    <div className="space-y-2">
      <Header title="Sets" level={HeaderLevel.SUB_SECTION} />
      <div className="grid grid-cols-6 gap-2">
        <p className="col-span-1 text-sm">Count</p>
        <p className="col-span-1 col-start-3 text-sm">Reps</p>
        <p className="col-span-2 col-start-5 text-sm">Weight (lbs.)</p>
      </div>
      {data.map((set, setIndex) => {
        const { count, reps, weight } = set;

        return (
          <div
            key={`exercise=-${index}-set-${setIndex}`}
            className="grid grid-cols-6 gap-2"
          >
            <Label
              className="hidden"
              htmlFor={`exercise-${index}-set-${setIndex}-sets`}
            >
              Set Count
            </Label>
            <Input
              id={`exercise-${index}-set-${setIndex}-sets`}
              type="text"
              inputMode="numeric"
              placeholder="0"
              className="col-span-1"
              min={1}
              max={20}
              value={count}
              onChange={(e) =>
                handleUpdate(setIndex, {
                  key: "count",
                  value: e.target.value,
                })
              }
            />
            <div className="col-span-1 text-center self-center">
              <X className="w-4 h-4 mx-auto" />
            </div>
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
              className="col-span-1"
              min={1}
              max={99}
              value={reps}
              onChange={(e) =>
                handleUpdate(setIndex, {
                  key: "reps",
                  value: e.target.value,
                })
              }
            />
            <div className="col-span-1 text-center self-center">
              <Weight className="w-4 h-4 mx-auto" />
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
              min={0.1}
              max={1000}
              value={weight}
              onChange={(e) =>
                handleUpdate(setIndex, {
                  key: "weight",
                  value: e.target.value,
                })
              }
            />
          </div>
        );
      })}
      <div className="mt-2 grid grid-cols-6 gap-2">
        <Button
          className="col-span-3"
          disabled={data.length >= 6}
          type="button"
          variant="outline"
          onClick={() => addSet(index)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          className="col-span-3"
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
