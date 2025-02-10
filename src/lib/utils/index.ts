import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { MuscleGroupString, MusclesDetailedString } from "../types";

export * from "./client";
export * from "./components-generators";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function hasForbiddenCharacters(value: string): boolean {
	return !/^[a-zA-Z0-9?_.\- ]*$/.test(value);
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const MuscleGroup: Record<MuscleGroupString, string> = {
	Arms: "Arms",
	Shoulders: "Shoulders",
	Chest: "Chest",
	Back: "Back",
	Legs: "Legs",
	Core: "Core",
	FullBody: "Full Body",
};
export const MatchableMuscleGroups = new RegExp(`${Object.values(MuscleGroup).join("|")}`, "gi");
