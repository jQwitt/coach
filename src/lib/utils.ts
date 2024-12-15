import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ExerciseData } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function toStringArray(value: ExerciseData[]) {
	return value.map((exercise) => JSON.stringify(exercise));
}

export function hasForbiddenCharacters(value: string): boolean {
	return !/^[A-Z0-9_\.\- ]*$/i.test(value);
}

export const CardSizes = {
	SMALL: "col-span-2 lg:col-span-1",
	MEDIUM: "col-span-3 lg:col-span-2",
	LARGE: "col-span-6 lg:col-span-4",
};
