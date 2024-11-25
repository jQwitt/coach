import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Exercise } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function toStringArray(value: Exercise[]) {
	return value.map((exercise) => JSON.stringify(exercise));
}

export function hasForbiddenCharacters(value: string): boolean {
	return !/^[A-Z0-9_\.\- ]*$/i.test(value);
}
