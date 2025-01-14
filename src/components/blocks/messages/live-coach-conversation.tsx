"use client";

import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import { LiveCoachConversationPhase, type MessageDirection } from "@/lib/types";
import { Dot } from "lucide-react";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { LiveCoachMessage, type LiveCoachMessageProps } from "./live-coach-message";

const DELAY_MIME = 500;
const LAST_MSG_ID = "coach-live-message-last";

export default function LiveCoachConversation({ userFirstName }: { userFirstName?: string }) {
	const params = useSearchParams();
	const { conversation, setIsTyping, setPhase, startConversation, addInboundMessage } =
		useConversation();
	const { conversationStarted, isTyping } = conversation;

	const foundIntent = params.get("intent");
	const parsdIntent = foundIntent
		?.trim()
		.split("")
		.filter((c) => c !== '"')
		.join("");

	const { messages } = conversation;
	let previousMessageDirection: MessageDirection | null = null;

	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	// biome-ignore lint: only run on mount
	React.useEffect(() => {
		if (!conversation.conversationStarted) {
			setIsTyping(true);
			setTimeout(() => {
				addInboundMessage({ text: `Hi ${userFirstName}!` });
				if (parsdIntent) {
					addInboundMessage({
						text: `You're looking to ${parsdIntent}, is that right?`,
					});
					setPhase(LiveCoachConversationPhase.CONFIRM_INTENT);
				} else {
					addInboundMessage({ text: "How can I help you today?" });
				}

				setIsTyping(false);
			}, DELAY_MIME);
		}
		startConversation();
	}, [conversationStarted]);

	React.useEffect(() => {
		if (isMounted && messages.length) {
			const last = document.getElementById(LAST_MSG_ID);
			if (last) {
				last.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [isMounted, messages.length]);

	return (
		<div className="min-w-full flex flex-col gap-1 max-h-[80dvh]">
			{isMounted &&
				messages?.map(({ direction, text, ...other }, i) => {
					const newGroup =
						previousMessageDirection !== null && previousMessageDirection !== direction;
					const props = {
						id: i === messages.length - 1 ? LAST_MSG_ID : "",
						text,
						direction,
						ear: newGroup,
						className: newGroup ? "mt-2" : "",
						...other,
					} satisfies LiveCoachMessageProps;

					previousMessageDirection = direction;

					return <LiveCoachMessage {...props} key={`coach-live-message-${i}`} />;
				})}
			{isTyping ? (
				<LiveCoachMessage direction="inbound" text="" className="flex">
					<Dot className="-mx-2 -mb-1 animate-bounce" />
					<Dot className="-mx-2 -mb-1 animate-bounce delay-100" />
					<Dot className="-mx-2 -mb-1 animate-bounce delay-200" />
				</LiveCoachMessage>
			) : null}
		</div>
	);
}
