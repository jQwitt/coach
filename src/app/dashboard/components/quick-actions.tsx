"use client";

import ActionButton from "@/components/ui/buttons/action-button";
import Header, { HeaderLevel } from "@/components/ui/header";

export default function QuickActions() {
	return (
		<div className="space-y-2">
			<Header title="Jump Back In" level={HeaderLevel.SECTION} />
			<div className="flex flex-col gap-2 sm:flex-row">
				<ActionButton url="/live-coach" text="Chat with Live Coach" />
				<ActionButton url="/log-workout" text="Log a Workout" variant="secondary" />
			</div>
		</div>
	);
}
