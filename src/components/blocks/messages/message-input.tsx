"use client";

import { determineTrainingIntent } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import * as React from "react";

export interface MessageInputProps {
	actions?: {
		[action: string]: {
			fullfillment?: (input: string) => Promise<string>;
		};
	};
}

export default function MessageInput({ actions }: MessageInputProps) {
	const [userMessage, setUserMessage] = React.useState("");
	const [hasBeenCalled, setHasBeenCalled] = React.useState(false);

	const handleSend = async () => {
		if (!hasBeenCalled) {
			const intent = determineTrainingIntent(userMessage);
			setHasBeenCalled(true);
		}

		setUserMessage("");
	};

	return (
		<div className="min-w-full px-5">
			<div className="flex justify-between gap-2">
				<div className="relative w-full">
					<input
						type="text"
						className="peer w-full border-b-2 border-gray-300 pb-1 pt-3 text-gray-900 placeholder-transparent transition-colors focus:border-primary focus:outline-none"
						placeholder="Talk with the coach"
						value={userMessage}
						onChange={(e) => setUserMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && userMessage.length > 20) handleSend();
						}}
					/>
					<Label
						htmlFor="userMessageInput"
						className="pointer-events-none absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
					>
						Ask your coach something...
					</Label>
				</div>
				<div>
					<Button
						size="icon"
						className="rounded-full"
						disabled={userMessage.length < 20}
						onClick={handleSend}
					>
						<Send />
					</Button>
				</div>
			</div>
			<div className="mt-3 flex gap-2 overflow-x-scroll">
				{Object.entries(actions ?? {})?.map(([action, { fullfillment }]) => (
					<Button
						variant="outline"
						className="rounded-full border"
						key={`action-${action}`}
						disabled
					>
						{action}
					</Button>
				))}
			</div>
		</div>
	);
}
