"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { fromIso, getDateParts } from "@/lib/encoding";
import type { WorkoutLiftingDataWithID } from "@/lib/types";
import { ArrowRight, Calendar, ChevronDown, Clock, Edit, X } from "lucide-react";
import { redirect } from "next/navigation";
import * as React from "react";

export default function WorkoutCard({
	data,
}: {
	data: WorkoutLiftingDataWithID;
}) {
	const [details, setDetails] = React.useState(false);

	const { name, date, exercises, id, tags } = data;
	if (!name || !date || !exercises.length) {
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
				<CardContent>
					<div className="flex items-center justify-start gap-2 flex-wrap">
						{tags?.map((tag) => (
							<Button variant="outline" key={tag}>
								{tag}
							</Button>
						))}
					</div>

					<div className="flex items-center justify-start gap-2 flex-wrap">
						{exercises.map(({ name }, i) => (
							<p
								key={`${name}-${i}`}
								className="text-ellipsis whitespace-nowrap overflow-hidden
								w-fit max-w-[40%] text-muted-foreground text-sm -mt-2"
							>
								{name}
							</p>
						))}
					</div>
				</CardContent>
			)}
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
