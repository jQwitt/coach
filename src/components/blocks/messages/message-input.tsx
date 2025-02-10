"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import { useLiveCoachController } from "@/hooks/use-live-coach-controller";
import {
	LiveCoachConversationPhase,
	type LiveCoachSupportedActionsEnum,
} from "@/lib/types/live-coach";
import { Send } from "lucide-react";
import * as React from "react";

interface MessageInputProps {
	actions?: Array<{
		key: LiveCoachSupportedActionsEnum;
		text: string;
	}>;
}

const inputLabels: Record<LiveCoachConversationPhase, string> = {
	[LiveCoachConversationPhase.DETERMINE_INTENT]: "Put your coach to work!",
	[LiveCoachConversationPhase.CONFIRM_INTENT]: "Yes or No",
	[LiveCoachConversationPhase.PROMPT_ACTION_INTENT]: "Try an exercise you've logged, i.e. 'Bench Press'",
	[LiveCoachConversationPhase.FULFILL_INTENT]: "Working on it...",
	[LiveCoachConversationPhase.PROMPT_FULFILLMENT_SUCCESS]: "How'd it go?",
	[LiveCoachConversationPhase.END_CONVERSATION]: "Thanks for talking with coach!",
	[LiveCoachConversationPhase.PROMPT_URL_INTENT]: "Yes or No",
	[LiveCoachConversationPhase.CONFIRM_URL_INTENT]: "Try an exercise you've logged, i.e. 'Bench Press'",
	[LiveCoachConversationPhase.PROMPT_MISSING_INTENT_EXERCISE]: "Try an exercise you've logged, i.e. 'Bench Press'",
	[LiveCoachConversationPhase.PROMPT_MISSING_INTENT_MUSCLE_GROUP]: "Try a muscle group, i.e. 'Chest' or 'Legs'",
};

export default function MessageInput({ actions }: MessageInputProps) {
	const {
		conversation: { phase, isTyping, fulfillmentStarted, limited },
	} = useConversation();
	const { handleOutboundMessage, handleActionClick } = useLiveCoachController();
	const [userMessage, setUserMessage] = React.useState("");
	const conversationClosed = phase === LiveCoachConversationPhase.END_CONVERSATION;
	const disabledInput = isTyping || fulfillmentStarted || conversationClosed;

	const handleSend = async () => {
		await handleOutboundMessage({ message: userMessage });
		setUserMessage("");
	};

	const onActionClick = async ({ action }: { action: LiveCoachSupportedActionsEnum }) => {
		handleActionClick({ action });
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
							if (e.key === "Enter" && !disabledInput) handleSend();
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
					<Button
						size="icon"
						className="rounded-full"
						disabled={disabledInput}
						onClick={handleSend}
					>
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
						disabled={disabledInput}
					>
						{text}
					</Button>
				))}
			</div>
		</div>
	);
}
