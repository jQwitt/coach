import { getWorkouts } from "@/app/actions";
import Header, { HeaderLevel } from "@/components/ui/header";
import WorkoutCard from "./components/workout-card";

export default async function Dashboard() {
  const workouts = await getWorkouts();

  return (
    <div>
      <Header title="Recent Workouts" level={HeaderLevel.SECTION} />
      {workouts.map((workout) => {
        return (
          <WorkoutCard key={`${workout.name}-${workout.date}`} data={workout} />
        );
      })}
    </div>
  );
}
