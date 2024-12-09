"use client";

import { Button } from "@/components/ui/button";
import Header, { HeaderLevel } from "@/components/ui/header";
import { redirect } from "next/navigation";

export default function QuickActions() {
	return (
		<div className="space-y-2">
			<Header title="Jump Back In" level={HeaderLevel.SECTION} />
			<div className="flex flex-col gap-2 sm:flex-row">
				<Button className="w-full sm:w-fit" onClick={() => redirect("/log-workout/lifting")}>
					Log Weights
				</Button>
				<Button className="w-full sm:w-fit" onClick={() => redirect("/log-workout/cycling")}>
					Log Cycling
				</Button>
			</div>
		</div>
	);
}
