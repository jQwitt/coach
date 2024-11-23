import { Heart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import WeekdayCountChart from "./components/weekday-count-chart";
import { getWorkouts } from "@/app/actions";

const initialCountPerWeekday = {
  Mon: 0,
  Tue: 0,
  Wed: 0,
  Thu: 0,
  Fri: 0,
  Sat: 0,
  Sun: 0,
};

export default async function Analytics() {
  const workouts = await getWorkouts();

  // get all workouts grouped by weekday

  const allWorkoutsByWeekday = Object.entries(
    workouts.reduce((acc, { date }) => {
      if (date) {
        const weekday = new Date(date).toString().split(" ")[0];

        return {
          ...acc,
          [weekday]: acc[weekday as keyof typeof initialCountPerWeekday] + 1,
        };
      }

      return acc;
    }, initialCountPerWeekday)
  ).map(([key, value]) => ({ day: key, count: value }));

  return (
    <div>
      <Header title="Analytics" />
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72 BPM</div>
            <p className="text-xs text-muted-foreground">+2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Header
              title="Total Workouts by Weekday"
              level={HeaderLevel.SECTION}
            />
            <p className="text-sm text-muted-foreground">
              All yours workouts organized by day of the week logged.
            </p>
          </CardHeader>
          <CardContent>
            <WeekdayCountChart data={allWorkoutsByWeekday} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
