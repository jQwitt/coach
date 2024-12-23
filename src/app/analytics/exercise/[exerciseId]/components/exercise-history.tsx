"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { fromIso, getDateParts } from "@/lib/encoding";
import type { ExerciseHistory } from "@/lib/types";
import { Calendar, Clock } from "lucide-react";

export default function ExerciseHistoryTable({
	history,
}: {
	history: ExerciseHistory;
}) {
	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<Header title="By Date" level={HeaderLevel.SECTION} />
				</CardHeader>
				<CardContent>
					<div className="max-h-[48px] overflow-y-scroll">
						{history.map(({ timeCompleted, totalSets, totalReps, maxWeight }) => {
							const { numericDayMonthYear, hours } = timeCompleted
								? getDateParts(fromIso(timeCompleted))
								: {};

							return (
								<div key={timeCompleted} className="grid grid-cols-5 gap-2">
									{timeCompleted && (
										<div className="col-span-3 flex gap-2 text-muted-foreground text-sm items-center">
											<Calendar className="h-4 w-4" />
											<p>{numericDayMonthYear}</p>
											<Clock className="h-4 w-4" />
											<p>{hours}</p>
										</div>
									)}
									<p className="col-start-4 col-span-1">
										{totalSets} x {totalReps}
									</p>
									<p className="col-start-5 col-span-1">{maxWeight}lbs.</p>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
