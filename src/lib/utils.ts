import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function hasForbiddenCharacters(value: string): boolean {
	return !/^[a-zA-Z0-9?_.\- ]*$/.test(value);
}
