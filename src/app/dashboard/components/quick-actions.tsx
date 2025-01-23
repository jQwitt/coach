"use client";

import SubmitButton from "@/components/ui/buttons/submit";
import Header, { HeaderLevel } from "@/components/ui/header";

export default function QuickActions() {
	return (
		<div className="space-y-2">
			<Header title="Jump Back In" level={HeaderLevel.SECTION} />
			<div className="flex flex-col gap-2 sm:flex-row">
				<SubmitButton url="/live-coach" text="Chat with Live Coach" />
				<SubmitButton url="/log-workout" text="Log a Workout" variant="secondary" />
			</div>
		</div>
	);
}
