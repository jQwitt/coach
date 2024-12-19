"use client";

import { DatePicker } from "@/components/forms/controls/date-picker";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTimeSpan } from "@/hooks/stores/use-time-span";
import type { TimeSpan } from "@/lib/types";
import { redirect } from "next/navigation";
import React from "react";
import { convertSpanToDate, getNumericDate } from "../helpers/date-ranges";

const Spans = {
	day: "Day",
	week: "Week",
	month: "Month",
	year: "Year",
	"all-time": "All Time",
} satisfies Record<TimeSpan, string>;

export default function TimeSpanSelect() {
	const [preferSpan, setPreferSpan] = React.useState(true);
	const [startDate, setStartDate] = React.useState<Date | null>(null);

	const { timeSpan, setTimeSpan } = useTimeSpan();

	const handleEndDateChange = (date: Date) => {
		if (startDate) {
			redirect(`/analytics/range/${getNumericDate(startDate)}..${getNumericDate(date)}`);
		}
	};

	const handleSelect = (value: TimeSpan) => {
		setTimeSpan(value);
		redirect(`/analytics/range/${convertSpanToDate(value)}/${value}`);
	};

	return (
		<div className="fixed bottom-3 left-4 sm:left-6 md:relative md:left-0 bg-background flex flex-row gap-2">
			{preferSpan ? (
				<Select onValueChange={handleSelect}>
					<SelectTrigger className="w-[120px]">
						<SelectValue placeholder={Spans[timeSpan]} defaultValue={timeSpan} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{Object.entries(Spans).map(([value, label]) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			) : (
				<div className="flex flex-col gap-2">
					<DatePicker placeholder="Start" onChange={setStartDate} />
					<DatePicker placeholder="End" onChange={handleEndDateChange} />
				</div>
			)}

			<Button variant="secondary" onClick={() => setPreferSpan(!preferSpan)}>
				{preferSpan ? "Prefer Date Range" : "Prefer Span"}
			</Button>
		</div>
	);
}
