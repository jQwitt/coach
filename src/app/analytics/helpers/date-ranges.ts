import { getDate, getEpoch } from "@/lib/dates";
import type { TimeSpan } from "@/lib/types";

const RANGE_DELIMITER = "..";

export function parseDates(range: string): { startDate: string; endDate: string } {
	// if no range is provided, return all
	if (!range) {
		return { startDate: getEpoch(), endDate: getDate() };
	}

	// if a range is provided, return the start and end dates
	if (range.includes(RANGE_DELIMITER)) {
		const [startDate, endDate] = range.split(RANGE_DELIMITER);

		return { startDate, endDate };
	}

	// otherwise interpret the range as just a start date
	if (range.length) {
		return { startDate: range, endDate: getDate() };
	}

	return { startDate: getDate(), endDate: getDate() };
}

export function convertSpanToDate(span: TimeSpan) {
	switch (span) {
		case "day":
			return getDate();
		case "week": {
			const week = new Date();
			week.setDate(week.getDate() - 7);
			return week.toISOString().split("T")[0];
		}
		case "month": {
			const month = new Date();
			month.setMonth(month.getMonth() - 1);
			return month.toISOString().split("T")[0];
		}
		case "year": {
			const year = new Date();
			year.setFullYear(year.getFullYear() - 1);
			return year.toISOString().split("T")[0];
		}
		case "all-time":
			return new Date("2000").toISOString().split("T")[0];
	}
}

export function toStartOfDay(toFormat: string) {
	const date = new Date(toFormat);
	date.setHours(0, 0, 0, 1);
	return date.toISOString();
}

export function toEndOfDay(toFormat: string) {
	const date = new Date(toFormat);
	date.setHours(23, 59, 59, 999);
	return date.toISOString();
}
