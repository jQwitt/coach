"use client";

import * as React from "react";
import { PlusCircle, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heading } from "@/app/fonts";
import SetsForm from "./sets-form";
import useWorkoutStore from "@/hooks/stores/use-workout";
import { createWorkoutByUser } from "@/app/actions";

export default function WorkoutForm({ userId }: { userId: number }) {
  const {
    workout,
    setWorkoutName,
    updateExerciseName,
    addExercise,
    removeExercise,
    addSetToExercise,
    removeSetFromExercise,
    updateExerciseSets,
  } = useWorkoutStore();
  const { name, exercises } = workout;
  const initName = `Workout on ${new Date().toDateString()}`;

  React.useEffect(() => {
    setWorkoutName(initName);
  }, [setWorkoutName, initName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(createWorkoutByUser({ data: { ...workout, userId } }));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="min-w-full">
        <div className="relative">
          <input
            type="text"
            className={`${heading.className} peer w-full pb-1 pt-3 border-b-2  focus:outline-none focus:border-primary focus:placeholder-gray-400 placeholder-primary text-primary focus:text-gray-400 border-gray-200  transition-colors text-2xl`}
            placeholder={name ?? initName}
          />
          <Edit3 className="pointer-events-none w-6 h-6 absolute right-0 top-[25%] peer-focus:hidden" />
        </div>
      </div>
      {exercises.map((exercise, index) => {
        const { name } = exercise;

        return (
          <div
            key={index}
            className="relative space-y-2 p-4 border border-gray-400 rounded-md"
          >
            <div className=" flex justify-between items-center">
              <div className="relative min-w-full">
                <input
                  type="text"
                  className={`peer w-full pb-1 pt-3 border-b-2  focus:outline-none focus:border-primary focus:placeholder-gray-400 placeholder-primary text-primary focus:text-gray-400 border-gray-200  transition-colors text-lg`}
                  placeholder={name}
                  onChange={(e) => {
                    updateExerciseName(index, e.target.value);
                  }}
                />
              </div>
            </div>
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeExercise(index)}
                className="absolute right-1 top-0 text-primary hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <SetsForm
              index={index}
              addSet={addSetToExercise}
              removeSet={removeSetFromExercise}
              updateSet={updateExerciseSets}
            />
          </div>
        );
      })}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => addExercise(undefined)}
      >
        Add Exercise
        <PlusCircle className="mr-2 h-4 w-4" />
      </Button>
      <Button type="button" className="w-full" onClick={handleSubmit}>
        Log Workout
      </Button>
    </form>
  );
}
