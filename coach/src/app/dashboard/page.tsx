import { getWorkouts } from "@/app/actions";
import Header from "@/components/ui/header";

export default async function Dashboard() {
  const workouts = await getWorkouts();

  return (
    <div>
      <Header title="Dashboard" />
      <div>
        {workouts.map((workout) => (
          <div key={workout.id}>{workout.name}</div>
        ))}
      </div>
    </div>
  );
}
