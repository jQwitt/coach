import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Exercise } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toStringArray(value: Exercise[]) {
  return value.map((exercise) => JSON.stringify(exercise));
}

export function noForbiddenCharacters(value: string): boolean {
  return /[^a-zA-Z0-9-.]/g.test(value);
}
