"use client";

import ActionButton from "@/components/ui/buttons/action-button";
import Header, { HeaderLevel } from "@/components/ui/header";
import { ExternalLink } from "lucide-react";

export const DetermineOneRepMax = () => {
	return (
		<>
			<Header title="How can I best target Hypertrophy?" level={HeaderLevel.SUB_SECTION} />
			<div className="flex flex-row flex-wrap text-primary">
				<p>
					Science for Sport recommends roughly
					<span className="weight-500 mx-1">6-12 repetitions</span> of
					<span className="font-semibold ml-1">67%-85% of your one rep max</span> - the heaviest
					weight you can safely lift for a single rep.
				</p>
			</div>

			<div className="flex flex-row justify-between items-end">
				<a
					href="https://www.scienceforsport.com/hypertrophy-training/#:~:text=We%20know%20that%20moderate%20loads,6%2D12%20repetitions%20being%20performed."
					target="_blank"
					rel="noreferrer"
					className="text-xs flex gap-1 items-center"
				>
					Read full article
					<ExternalLink size={16} />
				</a>
				<ActionButton
					url="/live-coach?intent='determine exercise weight'"
					text="How heavy should I be lifting?"
				/>
			</div>
		</>
	);
};
