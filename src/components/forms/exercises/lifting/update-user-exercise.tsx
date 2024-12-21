"use client";

import { createExercise, updateExercise } from "@/app/actions";
import { Button } from "@/components/ui/button";
import Header, { HeaderLevel } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { MuscleGroups, MusclesDetailed, UserExerciseLifting } from "@/lib/types";
import { Check, Loader2 } from "lucide-react";
import * as React from "react";

const MuscleGroup = {
	Arms: "Arms",
	Back: "Back",
	Chest: "Chest",
	Legs: "Legs",
	Shoulders: "Shoulders",
	Core: "Core",
	FullBody: "Full Body",
} satisfies Record<MuscleGroups, string>;

const MuscleGroupDetailed = {
	Arms: [
		"Biceps Long",
		"Biceps Short",
		"Biceps Brachii",
		"Triceps Long",
		"Triceps Short",
		"Triceps Medial",
	],
	Back: ["Latissimus Dorsi", "Trapezius"],
	Chest: ["Pectoralis"],
	Legs: ["Quads", "Hamstrings", "Calves", "Glutes"],
	Shoulders: ["Anterior Deltoid", "Medial Deltoid", "Posterior Deltoid"],
	Core: ["Abdominal", "Obliques"],
	FullBody: [],
} satisfies Record<MuscleGroups, MusclesDetailed[]>;

export default function UpdateUserExerciseForm({ data }: { data?: UserExerciseLifting }) {
	const { id, name, primaryTarget, detailedTargets } = data ?? {};
	const isNew = !name;

	const [exerciseName, setExerciseName] = React.useState(name ?? "");
	const [muscleGroup, setMuscleGroup] = React.useState<MuscleGroups | null>(
		(primaryTarget as MuscleGroups) ?? null,
	);
	const [detailedMuscles, setDetailedMuscles] = React.useState<MusclesDetailed | null>(
		(detailedTargets as unknown as MusclesDetailed) ?? null,
	);

	const [submitting, setSubmitting] = React.useState(false);
	const [submitted, setSubmitted] = React.useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);

		const toUpdate = {
			name: exerciseName,
			primaryTarget: muscleGroup?.toString() ?? "",
			detailedTargets: [detailedMuscles?.toString() ?? ""],
		} satisfies Omit<UserExerciseLifting, "id" | "userId">;

		if (id) {
			const result = await updateExercise({
				exerciseId: id.toString(),
				data: toUpdate,
			});
			if (result) {
				setSubmitted(true);
			}
		} else {
			const result = await createExercise({ data: toUpdate });
			if (result) {
				setSubmitted(true);
			}
		}

		setSubmitting(false);
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			<Header
				title={`${isNew ? "Add" : "Update"} Exercise`}
				level={HeaderLevel.SUB_SECTION}
				className="my-1"
			/>
			<div>
				<label htmlFor="exerciseName" className="text-sm tracking-wide">
					Exercise Name
				</label>
				<Input
					name="exerciseName"
					placeholder={"e.g. Bench Press"}
					value={exerciseName}
					onChange={(e) => setExerciseName(e.target.value)}
					required
				/>
			</div>
			<div className="flex flex-row gap-2 items-end">
				<div className="w-1/2">
					<label htmlFor="primaryTarget" className="text-sm tracking-wide">
						Primary Target
					</label>
					<Select onValueChange={(value) => setMuscleGroup(value as MuscleGroups)} required>
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
								<SelectItem value="other">Other</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="w-1/2">
					<div className="flex items-center justify-between">
						<label htmlFor="muscleGroupDetailed" className="text-sm tracking-wide">
							Detailed Target
						</label>
						<p className="text-xs text-muted-foreground tracking-tight">{"(optional)"}</p>
					</div>
					<Select
						name="muscleGroupDetailed"
						disabled={!muscleGroup}
						onValueChange={(value) => setDetailedMuscles(value as MusclesDetailed)}
					>
						<SelectTrigger>
							<SelectValue placeholder="" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{muscleGroup && (
									<>
										{MuscleGroupDetailed[muscleGroup].map((value) => (
											<SelectItem key={value} value={value}>
												{value}
											</SelectItem>
										))}
										<SelectItem value="other">Other</SelectItem>
									</>
								)}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			{submitted ? (
				<Button type="button" className="w-full" variant="secondary">
					Done
					<Check className="w-4 h-4" />
				</Button>
			) : (
				<Button type="submit" className="w-full" disabled={submitting}>
					{submitting ? <Loader2 className="animate-spin" /> : "Submit"}
				</Button>
			)}
		</form>
	);
}
