"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { fromIso, getDateParts } from "@/lib/encoding";
import type { WorkoutLifting } from "@/lib/types";
import { ArrowRight, Calendar, ChevronDown, Clock, Edit, X } from "lucide-react";
import { redirect } from "next/navigation";
import * as React from "react";

export default function WorkoutCard({
	data,
}: {
	data: WorkoutLifting;
}) {
	const [details, setDetails] = React.useState(false);

	const { name, date, id } = data;
	if (!name || !date) {
		return null;
	}

	const { numericDayMonthYear, hours } = getDateParts(fromIso(date));

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
				<Button variant="ghost" onClick={() => setDetails(!details)}>
					{details ? <X /> : <ChevronDown />}
				</Button>
			</CardHeader>
			{details && (
				<CardFooter className="flex justify-between">
					<Button variant="outline" onClick={() => redirect(`/analytics/${id}`)}>
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
