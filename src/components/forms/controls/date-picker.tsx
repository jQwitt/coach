"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePicker({
	placeholder,
	onChange,
}: { placeholder?: string; onChange?: (date: Date) => void }) {
	const [date, setDate] = React.useState<Date>();

	const handleChange = (date: Date | undefined) => {
		if (date) {
			setDate(date);
			onChange?.(date);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span>{placeholder || "Pick a date"}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={date} onSelect={handleChange} initialFocus />
			</PopoverContent>
		</Popover>
	);
}
