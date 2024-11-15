"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Trash2 } from "lucide-react";

type Exercise = {
  name: string;
  sets: number;
  reps: number;
};

type Workout = {
  id: number;
  name: string;
  exercises: Exercise[];
  date: string;
};

export default function Lifting() {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("workouts");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (workout: Omit<Workout, "id" | "date">) => {
    setWorkouts([
      ...workouts,
      {
        ...workout,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const totalWorkouts = workouts.length;
  const totalExercises = workouts.reduce(
    (sum, workout) => sum + workout.exercises.length,
    0
  );

  return (
    <div className="dark">
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto p-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Dark Theme Fitness Tracker
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Log Workout</CardTitle>
              </CardHeader>
              <CardContent>
                <WorkoutForm onAddWorkout={addWorkout} />
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <Stats
                  totalWorkouts={totalWorkouts}
                  totalExercises={totalExercises}
                />
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Workout History</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkoutList workouts={workouts} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function WorkoutForm({
  onAddWorkout,
}: {
  onAddWorkout: (workout: Omit<Workout, "id" | "date">) => void;
}) {
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", sets: 0, reps: 0 },
  ]);

  const handleExerciseChange = (
    index: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: 0, reps: 0 }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      workoutName &&
      exercises.every((e) => e.name && e.sets > 0 && e.reps > 0)
    ) {
      onAddWorkout({ name: workoutName, exercises });
      setWorkoutName("");
      setExercises([{ name: "", sets: 0, reps: 0 }]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="workoutName" className="text-white">
          Workout Name
        </Label>
        <Input
          id="workoutName"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          placeholder="e.g., Full Body Workout"
          required
          className="bg-gray-700 text-white border-gray-600 focus:border-gray-500 placeholder-gray-400"
        />
      </div>
      {exercises.map((exercise, index) => (
        <div key={index} className="space-y-2 p-4 bg-gray-700 rounded-md">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-white">Exercise {index + 1}</h4>
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeExercise(index)}
                className="text-white hover:text-gray-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor={`exercise-${index}`} className="text-white">
                Name
              </Label>
              <Input
                id={`exercise-${index}`}
                value={exercise.name}
                onChange={(e) =>
                  handleExerciseChange(index, "name", e.target.value)
                }
                placeholder="e.g., Squats"
                required
                className="bg-gray-600 text-white border-gray-500 focus:border-gray-400 placeholder-gray-400"
              />
            </div>
            <div>
              <Label htmlFor={`sets-${index}`} className="text-white">
                Sets
              </Label>
              <Input
                id={`sets-${index}`}
                type="number"
                value={exercise.sets || ""}
                onChange={(e) =>
                  handleExerciseChange(index, "sets", parseInt(e.target.value))
                }
                placeholder="3"
                required
                min="1"
                className="bg-gray-600 text-white border-gray-500 focus:border-gray-400 placeholder-gray-400"
              />
            </div>
            <div>
              <Label htmlFor={`reps-${index}`} className="text-white">
                Reps
              </Label>
              <Input
                id={`reps-${index}`}
                type="number"
                value={exercise.reps || ""}
                onChange={(e) =>
                  handleExerciseChange(index, "reps", parseInt(e.target.value))
                }
                placeholder="10"
                required
                min="1"
                className="bg-gray-600 text-white border-gray-500 focus:border-gray-400 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-full bg-gray-700 text-white hover:bg-gray-600"
        onClick={addExercise}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add Exercise
      </Button>
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white hover:bg-blue-700"
      >
        Log Workout
      </Button>
    </form>
  );
}

function WorkoutList({ workouts }: { workouts: Workout[] }) {
  return (
    <ScrollArea className="h-[400px]">
      <ul className="space-y-4">
        {workouts.map((workout) => (
          <li key={workout.id} className="bg-gray-700 p-4 rounded-md">
            <h3 className="font-bold text-lg mb-2 text-white">
              {workout.name}
            </h3>
            <p className="text-sm text-gray-300 mb-2">Date: {workout.date}</p>
            <ul className="space-y-2">
              {workout.exercises.map((exercise, index) => (
                <li key={index} className="bg-gray-600 p-2 rounded">
                  <p className="font-medium text-white">{exercise.name}</p>
                  <p className="text-sm text-gray-300">
                    {exercise.sets} sets x {exercise.reps} reps
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

function Stats({
  totalWorkouts,
  totalExercises,
}: {
  totalWorkouts: number;
  totalExercises: number;
}) {
  return (
    <div className="space-y-2 text-white">
      <p>Total Workouts: {totalWorkouts}</p>
      <p>Total Exercises: {totalExercises}</p>
      <p>
        Average Exercises per Workout:{" "}
        {totalWorkouts > 0 ? (totalExercises / totalWorkouts).toFixed(2) : 0}
      </p>
    </div>
  );
}
