"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export interface MessageInputProps {
	actions?: string[];
}

export default function MessageInput({ actions }: MessageInputProps) {
	return (
		<div className="min-w-full px-5">
			<div className="relative">
				<input
					type="text"
					className="peer w-full border-b-2 border-gray-300 pb-1 pt-3 text-gray-900 placeholder-transparent transition-colors focus:border-primary focus:outline-none"
					placeholder="Talk with the coach"
				/>
				<Label
					htmlFor="userMessageInput"
					className="pointer-events-none absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
				>
					Tell your coach something...
				</Label>
			</div>
			<div className="mt-3 flex gap-2">
				{actions?.map((action) => (
					<Button
						variant="outline"
						className="rounded-full border"
						key={`user-Input-action-${action}`}
					>
						{action}
					</Button>
				))}
			</div>
		</div>
	);
}
