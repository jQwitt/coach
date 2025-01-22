"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { PlaceHolderCardEmpty } from "@/components/ui/cards/placeholder-empty";
import Header, { HeaderLevel } from "@/components/ui/header";
import type { UserExerciseLifting } from "@/lib/types";
import { ArrowRight, Dumbbell, Pencil } from "lucide-react";
import { redirect } from "next/navigation";

export default function ExerciseList({ exercises }: { exercises: UserExerciseLifting[] }) {
	return (
		<div>
			<Header title="Your Exercises" level={HeaderLevel.SECTION} />
			<div
				className={`w-full flex gap-2 ${exercises.length > 2 ? "overflow-x-scroll" : "overflow-hidden"}`}
			>
				{exercises.length === 0 && (
					<PlaceHolderCardEmpty text="Your exercises will appear here as you log your workouts!" />
				)}
				{exercises.map(({ id, name, primaryTarget, detailedTargets }) => (
					<Card key={name} className="relative min-w-[45%] min-h-[160px] overflow-hidden">
						<CardHeader>
							<Header title={name} level={HeaderLevel.SUB_SECTION} />
							<div className="min-h-[36px]">
								<p className="text-sm text-muted-foreground font-bold">{primaryTarget}</p>
								<p className="text-xs text-muted-foreground">{detailedTargets.join(", ")}</p>
							</div>
						</CardHeader>
						<Dumbbell className="absolute -bottom-3 -right-4 h-20 w-20 opacity-10" />
						<CardFooter>
							<Button className="group" onClick={() => redirect(`/analytics/exercise/${id}`)}>
								See Progress
								<ArrowRight
									size={16}
									className="transition-all ease-in duration-100 group-hover:translate-x-2"
								/>
							</Button>
						</CardFooter>
						<Button
							variant="ghost"
							size="icon"
							className="absolute top-0 right-0 group"
							onClick={() => redirect("/profile")}
						>
							<Pencil className="transition-all ease-in duration-100 group-hover:rotate-[-15deg]" />
						</Button>
					</Card>
				))}
			</div>
		</div>
	);
}
