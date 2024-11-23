import { Clock } from "lucide-react";

import { Card, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { WorkoutLifting, WorkoutLiftingData } from "@/lib/types";

export default function WorkoutCard({
  data,
}: {
  data: WorkoutLiftingData & Pick<WorkoutLifting, "date">;
}) {
  const { name } = data;
  if (!name || !data.date) {
    return null;
  }

  const date = new Date(data.date);
  const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

  return (
    <Card>
      <CardHeader>
        <Header title={name} level={HeaderLevel.SUB_SECTION} />
        <div className="flex gap-2 items-center">
          <Clock className="h-4 w-4" />
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </CardHeader>
    </Card>
  );
}
