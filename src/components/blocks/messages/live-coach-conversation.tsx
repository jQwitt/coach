"use client";

import {
	LIVE_COACH_DELAY_MIME,
	SCROLL_TO_LAST_ID,
} from "@/components/controllers/live-coach-controller";
import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import { getNamedSearchParams } from "@/lib/client-utils";
import { Dot } from "lucide-react";
import * as React from "react";
import { LiveCoachMessage, type LiveCoachMessageProps } from "./live-coach-message";

export default function LiveCoachConversation({ userFirstName }: { userFirstName?: string }) {
	const { conversation, startConversationWithIntent, setIsTyping } = useConversation();
	const { isTyping, messages, conversationStarted } = conversation;
	const { intent } = getNamedSearchParams("intent");

	// want to mimic the delay of a human typing
	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setIsTyping(false);
			startConversationWithIntent({ userFirstName, intent });
		}, LIVE_COACH_DELAY_MIME);

		if (!conversationStarted) {
			setIsTyping(true);
		} else {
			clearTimeout(timeout);
		}
	}, [setIsTyping, startConversationWithIntent, userFirstName, intent, conversationStarted]);

	return (
		<div className="min-w-full flex flex-col gap-1 max-h-[80dvh]" suppressHydrationWarning>
			{messages?.map(({ direction, text, ...other }, i) => {
				const lastMessage = i === messages.length - 1;
				const lastInGroup = !lastMessage && messages[i + 1].direction !== direction;

				const props = {
					id: lastMessage ? SCROLL_TO_LAST_ID : "",
					text,
					direction,
					ear: lastInGroup || lastMessage,
					className: lastInGroup ? "mt-2" : "",
					...other,
				} satisfies LiveCoachMessageProps;

				return <LiveCoachMessage {...props} key={`coach-live-message-${i}`} />;
			})}
			<LiveCoachTypingIndicator show={isTyping} />
		</div>
	);
}

function LiveCoachTypingIndicator({ show }: { show: boolean }) {
	if (!show) {
		return null;
	}

	return (
		<LiveCoachMessage direction="inbound" text="" className="flex">
			<Dot className="-mx-2 -mb-1 animate-bounce" />
			<Dot className="-mx-2 -mb-1 animate-bounce delay-100" />
			<Dot className="-mx-2 -mb-1 animate-bounce delay-200" />
		</LiveCoachMessage>
	);
}
