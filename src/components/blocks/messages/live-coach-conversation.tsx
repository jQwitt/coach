"use client";

import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import type { MessageDirection } from "@/lib/types";
import { Dot } from "lucide-react";
import * as React from "react";
import { Message, type MessageProps } from "./message";

const DELAY_MIME = 500;

export default function LiveCoachMessage({ userFirstName }: { userFirstName?: string }) {
	const { conversation, setIsTyping, startConversation, addInboundMessage } = useConversation();
	const { conversationStarted, isTyping } = conversation;

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
				addInboundMessage({ text: `Hi ${userFirstName}! How can I help you today?` });
				setIsTyping(false);
			}, DELAY_MIME);
		}
		startConversation();
	}, [conversationStarted]);

	return (
		<div className="min-w-full flex flex-col gap-1">
			{isMounted &&
				messages?.map(({ direction, text, ...other }, i) => {
					const newGroup =
						previousMessageDirection !== null && previousMessageDirection !== direction;
					const props = {
						text,
						direction,
						ear: newGroup,
						className: newGroup ? "mt-2" : "",
						...other,
					} satisfies MessageProps;

					previousMessageDirection = direction;

					return <Message {...props} key={`coach-live-message-${i}`} />;
				})}
			{isTyping ? (
				<Message direction="inbound" text="" className="flex">
					<Dot className="-mx-2 -mb-1 animate-bounce" />
					<Dot className="-mx-2 -mb-1 animate-bounce delay-100" />
					<Dot className="-mx-2 -mb-1 animate-bounce delay-200" />
				</Message>
			) : null}
		</div>
	);
}
