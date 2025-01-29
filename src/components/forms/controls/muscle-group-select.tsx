"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { MuscleGroups } from "@/lib/types";

const MuscleGroup = {
	Arms: "Arms",
	Back: "Back",
	Chest: "Chest",
	Legs: "Legs",
	Shoulders: "Shoulders",
	Core: "Core",
	FullBody: "Full Body",
} satisfies Record<MuscleGroups, string>;

export default function MuscleGroupSelect({
	value,
	disabled,
	onChange,
}: { value: MuscleGroups; disabled?: boolean; onChange: (value: MuscleGroups) => void }) {
	return (
		<Select value={value} onValueChange={onChange} disabled={disabled}>
			<SelectTrigger>
				<SelectValue placeholder="Select..." />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{Object.entries(MuscleGroup).map(([key, label]) => (
						<SelectItem key={key} value={key}>
							{label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
