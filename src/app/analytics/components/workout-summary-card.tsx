"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import type { Exercise } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

export default function WorkoutSummaryCard({ exercises }: { exercises: Exercise[] }) {
	return (
		<div className="space-y-8">
			<Card>
				<CardHeader>
					<Header title="Exercises" level={HeaderLevel.SECTION} />
				</CardHeader>
				<CardContent>
					{exercises?.map(({ name }) => {
						return (
							<div key={name}>
								<p>{name}</p>
							</div>
						);
					})}
				</CardContent>
			</Card>
			<div className="flex justify-center w-full">
				<Button onClick={() => redirect("/dashboard")}>
					<ArrowLeft size={16} />
					Back to Dashboard
				</Button>
			</div>
		</div>
	);
}
