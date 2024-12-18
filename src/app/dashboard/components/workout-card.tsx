"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { fromIso, getDateParts } from "@/lib/encoding";
import type { WorkoutLifting } from "@/lib/types";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { redirect } from "next/navigation";

export default function WorkoutCard({
	data,
}: {
	data: WorkoutLifting;
}) {
	const { id, name, timeCompleted } = data;

	const { numericDayMonthYear, hours } = getDateParts(fromIso(timeCompleted));

	return (
		<Card className="relative">
			<CardHeader className="flex flex-row items-center justify-between gap-2">
				<div className="max-w-[80%] text-ellipsis overflow-clip whitespace-nowrap">
					<Header title={name} level={HeaderLevel.SUB_SECTION} className="truncate" />
					<div className="flex flex-row items-center justify-start gap-2 -mt-1">
						<Calendar className="h-4 w-4" />
						<p className="text-sm text-muted-foreground">{numericDayMonthYear}</p>
						<Clock className="h-4 w-4" />
						<p className="text-sm text-muted-foreground">{hours}</p>
					</div>
				</div>
				<Button
					onClick={() => redirect(`/analytics/workout/${id}`)}
					variant="secondary"
					className="group"
				>
					Analytics
					<ArrowRight className="group-hover:translate-x-1 transition-all ease-in duration-100" />
				</Button>
			</CardHeader>
		</Card>
	);
}
