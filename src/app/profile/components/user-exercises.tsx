"use client";

import UpdateUserExerciseForm from "@/components/forms/exercises/lifting/update-user-exercise";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Header, { HeaderLevel } from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserExerciseLifting } from "@/lib/types";
import { Pencil, Plus } from "lucide-react";
import * as React from "react";

export default function UserExercises({ exercises }: { exercises: UserExerciseLifting[] }) {
	const [isMounted, setIsMounted] = React.useState(false);
	const [selectedExercise, setSelectedExercise] = React.useState<UserExerciseLifting | null>(null);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return <Loading />;

	return (
		<div className="flex flex-col gap-2" suppressHydrationWarning>
			<Header title="Your Exercises" level={HeaderLevel.SUB_SECTION} />
			<div>
				{exercises.map((exercise, i) => {
					const { name } = exercise;
					return (
						<div key={`${name}-${i}`} className="flex justify-between items-center">
							<p> {name}</p>
							<Dialog>
								<DialogTrigger asChild>
									<Button size="sm" variant="ghost">
										Edit
										<Pencil />
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle className="hidden">Exercises</DialogTitle>
									<UpdateUserExerciseForm data={exercise} />
								</DialogContent>
							</Dialog>
						</div>
					);
				})}
			</div>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">
						Add Exercise
						<Plus />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogTitle className="hidden">Exercises</DialogTitle>
					<UpdateUserExerciseForm />
				</DialogContent>
			</Dialog>
		</div>
	);
}

const Loading = () => {
	return (
		<div className="space-y-2">
			<div className="flex justify-between items-center min-w-full">
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-8 w-16" />
			</div>
			<div className="flex justify-between items-center min-w-full">
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-8 w-16" />
			</div>
		</div>
	);
};
