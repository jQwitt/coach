import type { Exercise, ExerciseSet } from "../types";

const SPLIT = "$";
const SET_SPLIT = "#";

export const encodeExercisesAsStrings = (exercises: Exercise[]): string[] => {
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

export const decodeStringsToExercises = (exercises: string[] | null): Exercise[] => {
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
				} satisfies ExerciseSet;
			}),
		} satisfies Exercise;
	});

	if (decoded.length === exercises.length) {
		return decoded;
	}

	return [];
};

export const timeStamp = (): string => {
	return new Date().toISOString();
};

export const fromIso = (iso: string): Date => {
	return new Date(iso);
};

export const getDateParts = (iso: Date) => {
	const [numericDayMonthYear, hours] = iso
		.toLocaleTimeString([], {
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
