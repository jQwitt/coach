export function getDateRangeISOs() {
	const now = new Date();
	const week = new Date(now);
	week.setDate(week.getDate() - 7);
	const month = new Date(now);
	month.setMonth(month.getMonth() - 1);
	const year = new Date(now);
	year.setFullYear(year.getFullYear() - 1);

	return {
		day: now.toISOString(),
		week: week.toISOString(),
		month: month.toISOString(),
		year: year.toISOString(),
		"all-time": new Date(0).toISOString(),
	};
}
