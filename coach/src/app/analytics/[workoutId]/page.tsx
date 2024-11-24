export default async function WorkoutAnalyticsPage({
  params,
}: {
  params: { workoutId: string };
}) {
  const { workoutId } = params;

  return <div>workout by id {workoutId}</div>;
}
