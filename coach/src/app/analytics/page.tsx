import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";
import { Heart, Moon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Mock data for the chartsn
const heartRateData = [
  { time: "00:00", rate: 62 },
  { time: "04:00", rate: 58 },
  { time: "08:00", rate: 70 },
  { time: "12:00", rate: 75 },
  { time: "16:00", rate: 72 },
  { time: "20:00", rate: 68 },
];

const stepData = [
  { day: "Mon", steps: 8234 },
  { day: "Tue", steps: 7890 },
  { day: "Wed", steps: 9345 },
  { day: "Thu", steps: 8765 },
  { day: "Fri", steps: 10234 },
  { day: "Sat", steps: 7654 },
  { day: "Sun", steps: 6543 },
];

const sleepData = [
  { day: "Mon", hours: 7.2 },
  { day: "Tue", hours: 6.8 },
  { day: "Wed", hours: 7.5 },
  { day: "Thu", hours: 7.1 },
  { day: "Fri", hours: 6.9 },
  { day: "Sat", hours: 8.2 },
  { day: "Sun", hours: 7.8 },
];

export default function Analytics() {
  return (
    <div>
      <h1>Analytics</h1>

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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Steps</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M19 15l-2 2-2-2" />
            <path d="M4 4L9 9" />
            <path d="M12 17l-2 2-2-2" />
            <path d="M15 6l2-2 2 2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8,342</div>
          <p className="text-xs text-muted-foreground">+12% from yesterday</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sleep</CardTitle>
          <Moon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7.2 hrs</div>
          <p className="text-xs text-muted-foreground">
            -0.5 hrs from yesterday
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Heart Rate Over Time</CardTitle>
          <CardDescription>
            Average heart rate throughout the day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              rate: {
                label: "Heart Rate",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData}>
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="var(--color-rate)"
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Step Count</CardTitle>
          <CardDescription>Number of steps taken each day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              steps: {
                label: "Steps",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stepData}>
                <Bar dataKey="steps" fill="var(--color-steps)" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sleep Duration</CardTitle>
          <CardDescription>Hours of sleep per night</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              hours: {
                label: "Sleep Duration",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepData}>
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="var(--color-hours)"
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
