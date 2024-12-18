"use client";

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
import { convertSpanToDate } from "../helpers/date-ranges";

const Spans = {
	day: "Day",
	week: "Week",
	month: "Month",
	year: "Year",
	"all-time": "All Time",
} satisfies Record<TimeSpan, string>;

export default function TimeSpanSelect() {
	const { timeSpan, setTimeSpan } = useTimeSpan();

	const handleSelect = (value: TimeSpan) => {
		setTimeSpan(value);
		redirect(`/analytics/range/${convertSpanToDate(value)}`);
	};

	return (
		<div className="fixed bottom-3 left-4 sm:left-6 md:relative md:left-0 bg-background">
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
		</div>
	);
}
