"use client";

import { ArrowRight, ChevronDown, Clock, Edit, X } from "lucide-react";
import { redirect } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import type { WorkoutLifting, WorkoutLiftingData } from "@/lib/types";

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
				className="absolute right-2 top-2"
				variant="ghost"
				onClick={() => setDetails(!details)}
			>
				{details ? <X /> : <ChevronDown />}
			</Button>
			<CardHeader>
				<Header title={name} level={HeaderLevel.SUB_SECTION} />
				<div className="flex items-center gap-2">
					<Clock className="h-4 w-4" />
					<p className="text-sm text-muted-foreground">{formattedDate}</p>
				</div>
			</CardHeader>
			{details && (
				<CardContent>
					<div className="relative flex w-full gap-2 overflow-x-auto border-t-2 pt-2">
						{exercises.map(({ name, sets }, i) => (
							<Card key={`${name}-${i}`} className="min-h-full min-w-48 max-w-48">
								<CardContent className="mt-4 overflow-clip whitespace-nowrap">
									<Header title={name} level={HeaderLevel.SUB_SECTION} className="truncate" />
									{sets.map(({ count, reps, weight }, i) => (
										<p
											key={`${name}-set-${i}`}
											className="overflow-clip text-ellipsis whitespace-nowrap text-sm text-muted-foreground"
										>{`${count} x ${reps} @ ${weight}`}</p>
									))}
								</CardContent>
							</Card>
						))}
						<div className="absolute bottom-1 left-0 z-10 h-4 w-full bg-gradient-to-t from-white to-transparent" />
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
