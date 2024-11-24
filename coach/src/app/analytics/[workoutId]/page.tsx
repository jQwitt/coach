import { PageProps } from ".next/types/app/page";

export default async function WorkoutAnalyticsPage({
  params,
}: {
  params: { workoutId: string };
} & PageProps) {
  const { workoutId } = params;

  return <div>workout by id {workoutId}</div>;
}
