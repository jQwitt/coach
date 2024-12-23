import type { ExerciseData, ExerciseSetData } from "../types";

const SPLIT = "$";
const SET_SPLIT = "#";

export const encodeExercisesAsStrings = (exercises: ExerciseData[]): string[] => {
	const encoded = exercises.map((exercise) => {
		const { name, sets } = exercise;
		let result = `${name}`;

		for (const set of sets) {
			const { count, reps, weight } = set;
			result += `${SPLIT}${count}${SET_SPLIT}${reps}${SET_SPLIT}${weight}`;
		}

		return result;
	});

	if (encoded.length === exercises.length) {
		return encoded;
	}

	return [];
};

export const decodeStringsToExercises = (exercises: string[] | null): ExerciseData[] => {
	if (!exercises?.length) {
		return [];
	}

	const decoded = exercises.map((exercise) => {
		const [name, ...sets] = exercise.split(SPLIT);

		return {
			name,
			sets: sets.map((set) => {
				const [count, reps, weight] = set.split(SET_SPLIT);

				return {
					count: Number(count),
					reps: Number(reps),
					weight: Number(weight),
					metadata: {},
				} satisfies ExerciseSetData;
			}),
		} satisfies ExerciseData;
	});

	if (decoded.length === exercises.length) {
		return decoded;
	}

	return [];
};

export function encodeSets(exercise: ExerciseData) {
	const { name, sets } = exercise;
	let result = `${name}${SPLIT}`;

	for (const set of sets) {
		const { count, reps, weight } = set;
		result += `${count}${SET_SPLIT}${reps}${SET_SPLIT}${weight}`;
	}

	return result;
}

export const timeStamp = (): string => {
	return new Date().toISOString();
};

export const fromIso = (iso: string): Date => {
	return new Date(iso);
};

export const getDateParts = (iso: Date) => {
	const [numericDayMonthYear, hours] = iso
		.toLocaleString([], {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
		.split(", ");
	const [weekday, month, numericDay, year, ...rest] = iso.toString().split(" ");
	const timeZone = rest.join(" ").split("(")[1].slice(0, -1);

	return {
		numericDayMonthYear,
		hours,
		weekday,
		month,
		numericDay,
		year,
		timeZone,
	};
};

export function formatDuration(minutes: string, options?: { detailed: boolean }) {
	const cast = Number(minutes);

	if (Number.isNaN(cast)) {
		return "";
	}

	const [m, s] = minutes.split(".");

	return `${m}m ${options?.detailed ? `${Math.floor(Number(s) * 60)}s` : ""}`;
}

export function getLongWeekday(weekday: string) {
	switch (weekday) {
		case "Mon":
			return "Monday";
		case "Tue":
			return "Tuesday";
		case "Wed":
			return "Wednesday";
		case "Thu":
			return "Thursday";
		case "Fri":
			return "Friday";
		case "Sat":
			return "Saturday";
		case "Sun":
			return "Sunday";
	}
}

export function formatHours(hours: string) {
	return `${hours[0] === "0" ? "" : hours[0]}${hours.slice(1)}`;
}
