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
	return !/^[a-zA-Z0-9_.\- ]*$/.test(value);
}
