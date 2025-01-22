import { getDate, getEpoch } from "@/lib/dates/server";
import { SupportedTimeSpans, type TimeSpan } from "@/lib/types";

const RANGE_DELIMITER = "..";

export function parse(params: Array<string>) {
	const result: {
		startDate: string;
		endDate: string;
		increment: TimeSpan | null;
	} = { startDate: getEpoch(), endDate: getDate(), increment: null };

	// if no range is provided, return all
	if (!params?.length) {
		return result;
	}

	const [range, increment] = params;

	// if a span is used as a range, convert it to a date range
	if (range in SupportedTimeSpans) {
		return {
			...result,
			startDate: convertSpanToDate(range as TimeSpan),
		};
	}

	// if a range is provided, return the start and end dates
	if (range.includes(RANGE_DELIMITER)) {
		const [startDate, endDate] = range.split(RANGE_DELIMITER);

		return { ...result, startDate, endDate };
	}

	// if a span is provided, include the increment
	if (increment in SupportedTimeSpans) {
		if (increment === "all-time") {
			return result;
		}

		result.increment = increment as TimeSpan;
		return { ...result, startDate: convertSpanToDate(increment as TimeSpan) };
	}

	// return a singe date given as the start date
	return { ...result, startDate: getDate() };
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
	date.setHours(0, 1, 0, 0);
	return date.toISOString();
}

export function toEndOfDay(toFormat: string) {
	const date = new Date(toFormat);
	date.setHours(23, 59, 59, 999);
	return date.toISOString();
}

export function getNumericDate(date: Date) {
	return date.toISOString().split("T")[0];
}

export function offset(date: Date, increment: TimeSpan) {
	switch (increment) {
		case "day":
			return new Date(date);
		case "week":
			return new Date(date.setDate(date.getDate() - 7));
		case "month":
			return new Date(date.setMonth(date.getMonth() - 1));
		case "year":
			return new Date(date.setFullYear(date.getFullYear() - 1));
		default:
			return date;
	}
}
