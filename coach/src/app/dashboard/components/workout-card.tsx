"use client";

import * as React from "react";
import { Clock, ChevronDown, X, ArrowRight, Edit } from "lucide-react";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { WorkoutLifting, WorkoutLiftingData } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function WorkoutCard({
  data,
  key,
}: {
  data: WorkoutLiftingData & Pick<WorkoutLifting, "date" | "id">;
  key?: string;
}) {
  const [details, setDetails] = React.useState(false);

  const { name, date: workoutDate, exercises, id } = data;
  if (!name || !workoutDate || !exercises.length) {
    return null;
  }

  const date = new Date(workoutDate);
  const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

  return (
    <Card className="relative" key={`${key ?? ""}-workout-${name}-${date}`}>
      <Button
        className="absolute top-2 right-2"
        variant="ghost"
        onClick={() => setDetails(!details)}
      >
        {details ? <X /> : <ChevronDown />}
      </Button>
      <CardHeader>
        <Header title={name} level={HeaderLevel.SUB_SECTION} />
        <div className="flex gap-2 items-center">
          <Clock className="h-4 w-4" />
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </CardHeader>
      {details && (
        <CardContent>
          <div className="relative w-full flex gap-2 overflow-x-auto border-t-2 pt-2">
            {exercises.map(({ name, sets }, i) => (
              <Card
                key={`${name}-${i}`}
                className="max-w-48 min-w-48 min-h-full"
              >
                <CardContent className="mt-4 overflow-clip whitespace-nowrap">
                  <Header
                    title={name}
                    level={HeaderLevel.SUB_SECTION}
                    className="truncate"
                  />
                  {sets.map(({ count, reps, weight }, i) => (
                    <p
                      key={`${name}-set-${i}`}
                      className="text-sm text-muted-foreground text-ellipsis whitespace-nowrap overflow-clip"
                    >{`${count} x ${reps} @ ${weight}`}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
            <div className="absolute bottom-1 left-0 w-full h-4 bg-gradient-to-t from-white to-transparent z-10"></div>
          </div>
        </CardContent>
      )}
      {details && (
        <CardFooter className="flex justify-end gap-1">
          <Button variant="ghost" onClick={() => redirect(`/analytics/${id}`)}>
            Edit
            <Edit />
          </Button>
          <Button onClick={() => redirect(`/analytics/${id}`)}>
            View in Analytics
            <ArrowRight />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
