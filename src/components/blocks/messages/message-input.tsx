"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import { useLiveCoachController } from "@/hooks/use-live-coach-controller";
import { LiveCoachConversationPhase, LiveCoachSupportedActionsEnum } from "@/lib/types/live-coach";
import { Send } from "lucide-react";
import * as React from "react";

export interface MessageInputProps {
	actions?: Array<{
		key: LiveCoachSupportedActionsEnum;
		text: string;
	}>;
}

const DELAY_MIME = 500;
const inputLabels: Record<LiveCoachConversationPhase, string> = {
	[LiveCoachConversationPhase.DETERMINE_INTENT]: "Try 'View analytics for bench press'",
	[LiveCoachConversationPhase.CONFIRM_INTENT]: "Yes or No",
	[LiveCoachConversationPhase.PROMPT_ACTION_INTENT]: "Let's get a bit more info about your goal",
	[LiveCoachConversationPhase.FULFILL_INTENT]: "Working on it...",
	[LiveCoachConversationPhase.PROMPT_FULFILLMENT_SUCCESS]: "How'd it go?",
	[LiveCoachConversationPhase.END_CONVERSATION]: "Thanks for talking with coach!",
};

export default function MessageInput({ actions }: MessageInputProps) {
	const {
		conversation: { phase, isTyping, fulfillmentStarted },
		setIsTyping,
		addInboundMessage,
		addOutboundMessage,
		setPhase,
	} = useConversation();
	const { handleOutboundMessage } = useLiveCoachController();
	const [userMessage, setUserMessage] = React.useState("");
	const [insight, setInsight] = React.useState({ intent: "", muscleGroup: "", exercise: "" });
	const [actionInProgress, setActionInProgress] = React.useState(false);
	const disableSend =
		actionInProgress || fulfillmentStarted || phase === LiveCoachConversationPhase.END_CONVERSATION;

	const handleSend = async () => {
		await handleOutboundMessage({ message: userMessage });
		setUserMessage("");
	};

	const onActionClick = async ({ action }: { action: LiveCoachSupportedActionsEnum }) => {
		setIsTyping(true);
		setPhase(LiveCoachConversationPhase.PROMPT_ACTION_INTENT);
		setActionInProgress(true);
		addOutboundMessage(action);

		if (action === LiveCoachSupportedActionsEnum.VIEW_ANALYTICS) {
			setTimeout(() => {
				setInsight((prev) => ({ ...prev, intent: LiveCoachSupportedActionsEnum.VIEW_ANALYTICS }));
				addInboundMessage({
					text: "What exercise would you like to view analytics for?",
				});
				setIsTyping(false);
			}, DELAY_MIME);
		}
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
						{inputLabels[phase as LiveCoachConversationPhase]}
					</Label>
				</div>
				<div>
					<Button size="icon" className="rounded-full" disabled={isTyping} onClick={handleSend}>
						<Send />
					</Button>
				</div>
			</div>
			<div className="mt-3 flex gap-2 overflow-x-none">
				{actions?.map(({ key, text }) => (
					<Button
						variant="outline"
						className="rounded-full border"
						key={`action-${key}`}
						onClick={() => onActionClick({ action: key })}
						disabled={disableSend}
					>
						{text}
					</Button>
				))}
			</div>
		</div>
	);
}
