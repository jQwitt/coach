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

export const MuscleGroup: Record<MuscleGroupString, string> = {
	Arms: "Arms",
	Shoulders: "Shoulders",
	Chest: "Chest",
	Back: "Back",
	Legs: "Legs",
	Core: "Core",
	FullBody: "Full Body",
};
export const MusclesDetailed: Record<MusclesDetailedString, string> = {
	"Biceps Long": "Biceps Long",
	"Biceps Short": "Biceps Short",
	"Biceps Brachii": "Biceps Brachii",
	"Anterior Deltoid": "Anterior Deltoid",
	"Medial Deltoid": "Medial Deltoid",
	"Posterior Deltoid": "Posterior Deltoid",
	"Triceps Long": "Triceps Long",
	"Triceps Short": "Triceps Short",
	"Triceps Medial": "Triceps Medial",
	Trapezius: "Trapezius",
	"Latissimus Dorsi": "Latissimus Dorsi",
	Pectoralis: "Pectoralis",
	Abdominal: "Abdominal",
	Obliques: "Obliques",
	Quads: "Quads",
	Hamstrings: "Hamstrings",
	Calves: "Calves",
	Glutes: "Glutes",
};
export const MuscleGroupOptionsCount = Object.values(MuscleGroup).length;
export const ReadableMuscleGroupsOptions = `${Object.values(MuscleGroup)
	.map((s, i) => {
		const lowered = s.toLowerCase();
		return i === MuscleGroupOptionsCount - 1 ? `or ${lowered}` : lowered;
	})
	.join(", ")}`;
export const MatchableMuscleGroups = new RegExp(`${Object.values(MuscleGroup).join("|")}`, "gi");
