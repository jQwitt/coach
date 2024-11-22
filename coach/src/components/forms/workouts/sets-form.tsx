"use client";

import * as React from "react";
import { X, PlusCircle, Delete } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExerciseSet } from "@/lib/types";
import { heading } from "@/app/fonts";

export default function SetsForm({
  index,
  onUpdate,
}: {
  index: number;
  onUpdate: (sets: ExerciseSet[]) => void;
}) {
  const [data, setData] = React.useState<ExerciseSet[]>([
    {
      reps: 0,
      weight: 0,
      metadata: {},
    },
  ]);

  React.useEffect(() => {
    onUpdate(data);
  }, [data, onUpdate]);

  const addSet = () => {
    setData([...data, { reps: 0, weight: 0, metadata: {} }]);
  };

  const removeSet = (index: number) => {
    const toUpdate = [...data];
    toUpdate.splice(index, 1);
    setData(toUpdate);
  };

  const updateReps = (index: number, value: Pick<ExerciseSet, "reps">) => {
    const toUpdate = [...data];
    const old = toUpdate[index];

    toUpdate[index] = {
      ...old,
      reps: value.reps,
    };

    setData(toUpdate);
  };

  const updateWeight = (index: number, value: Pick<ExerciseSet, "weight">) => {
    const toUpdate = [...data];
    const old = toUpdate[index];

    toUpdate[index] = {
      ...old,
      weight: value.weight,
    };

    setData(toUpdate);
  };

  return (
    <div className="space-y-2">
      <Label
        htmlFor={`sets-${index}`}
        className={`${heading.className} text-2xl`}
      >
        Sets
      </Label>
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
                updateReps(setIndex, { reps: Number(e.target.value) })
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
                updateWeight(setIndex, { weight: Number(e.target.value) })
              }
            />
            {setIndex > 0 && (
              <Button
                className="hover:text-destructive ml-5"
                variant="ghost"
                onClick={() => removeSet(setIndex)}
              >
                <Delete className="col-start-6 x-6 h-6 self-center mx-auto" />
              </Button>
            )}
          </div>
        );
      })}
      <div className="grid grid-cols-6">
        <Button
          type="button"
          variant="outline"
          className="w-full col-span-5 mt-2"
          onClick={addSet}
        >
          Add set
          <PlusCircle className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
