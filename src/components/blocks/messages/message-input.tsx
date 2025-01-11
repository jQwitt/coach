"use client";

import { determineTrainingIntent } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import { LiveCoachConversationPhase } from "@/lib/types";
import { Send } from "lucide-react";
import * as React from "react";

export interface MessageInputProps {
	actions?: {
		[action: string]: {
			fullfillment?: (input: string) => Promise<string>;
		};
	};
}

const DELAY_MIME = 600;

export default function MessageInput({ actions }: MessageInputProps) {
	const {
		conversation: { phase, isTyping },
		setIsTyping,
		addInboundMessage,
		addOutboundMessage,
		setPhase,
	} = useConversation();
	const [userMessage, setUserMessage] = React.useState("");
	const [sendCount, setSendCount] = React.useState(0);

	const handleSend = async () => {
		addOutboundMessage(userMessage);
		setSendCount((count) => count + 1);

		if (sendCount > 3) {
			addInboundMessage(
				"You've hit the daily limit on messages to your coach. To increase your limit, upgrade your plan.",
			);
			return;
		}

		if (phase === LiveCoachConversationPhase.DETETMINE_INTENT) {
			setIsTyping(true);
			const insight = await determineTrainingIntent(userMessage);

			// if no insights availble, ask again
			if (!insight || !insight.intent) {
				addInboundMessage("Sorry I didn't get that, what can I help you with?");
				return;
			}
			setIsTyping(false);

			const { intent, muscleGroup, exercise } = insight;
			addInboundMessage(
				`I think you're looking to ${intent}${exercise ? `, emphasizing ${exercise}` : ""}${exercise ? `, targeting ${muscleGroup}` : ""}, is that right?`,
			);
			setPhase(LiveCoachConversationPhase.CONFIRM_INTENT);
		} else if (phase === LiveCoachConversationPhase.CONFIRM_INTENT) {
			setIsTyping(true);

			if (userMessage.match(/yes/gi)) {
				setTimeout(() => {
					setIsTyping(false);
					addInboundMessage("Got it!");
				}, DELAY_MIME);
				setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
				setIsTyping(true);
				return;
			}

			setTimeout(() => {
				setIsTyping(false);
				addInboundMessage("Sorry, I didn't get that, what can I help you with?");
			}, DELAY_MIME);
			setPhase(LiveCoachConversationPhase.DETETMINE_INTENT);
		}

		setUserMessage("");
	};

	return (
		<div className="min-w-full">
			<div className="flex justify-between gap-2">
				<div className="relative w-full">
					<input
						type="text"
						className="peer w-full border-b-2 border-gray-300 pb-1 pt-3 text-gray-900 placeholder-transparent transition-colors focus:border-primary focus:outline-none"
						placeholder="Talk with the coach"
						value={userMessage}
						onChange={(e) => setUserMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSend();
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
					<Button size="icon" className="rounded-full" disabled={isTyping} onClick={handleSend}>
						<Send />
					</Button>
				</div>
			</div>
			<div className="hidden mt-3 flex gap-2 overflow-x-scroll">
				{Object.entries(actions ?? {})?.map(([action]) => (
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
