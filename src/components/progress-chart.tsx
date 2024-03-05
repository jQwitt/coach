import { LineChart } from "@tremor/react";

import { Exercise, FunctionComponent } from "@/types";

const valueFormatter = function (number: number | bigint) {
  return new Intl.NumberFormat("us").format(number).toString() + " lbs";
};

export interface ProgressChart {
  exercise: Exercise;
}

export const ProgressChart: FunctionComponent<ProgressChart> = ({
  exercise,
}) => {
  const { sets } = exercise;
  const formattedData = sets.map(({ reps, weight }, i) => ({
    i: i + 1,
    reps,
    weight,
  }));

  return (
    <div className="flex flex-row">
      <div className="h-48 w-64">
        <LineChart
          className="w-full h-full"
          data={formattedData}
          index="i"
          yAxisWidth={65}
          categories={["reps"]}
          colors={["indigo"]}
          showAnimation
        />
      </div>
      <div className="h-48 w-64">
        <LineChart
          className="w-full h-full"
          data={formattedData}
          index="i"
          yAxisWidth={65}
          categories={["weight"]}
          colors={["cyan"]}
          valueFormatter={valueFormatter}
          showAnimation
        />
      </div>
    </div>
  );
};
