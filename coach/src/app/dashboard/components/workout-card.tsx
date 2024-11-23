import { Card, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { WorkoutLifting, WorkoutLiftingData } from "@/lib/types";

export default function WorkoutCard({
  data,
}: {
  data: WorkoutLiftingData & Pick<WorkoutLifting, "date">;
}) {
  const { name, date } = data;
  if (!name) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <Header title={name} level={HeaderLevel.SUB_SECTION} />
        <p className="text-sm text-muted-foreground">{date}</p>
      </CardHeader>
    </Card>
  );
}
