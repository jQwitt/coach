"use client";

import { MESSAGE_LIMIT } from "@/components/controllers/live-coach-controller";
import { useConversation } from "@/hooks/stores/use-live-coach-conversation";

export function useLiveCoachController() {
	const {
		conversation: { sentCount },
		addOutboundMessage,
		addInboundMessage,
	} = useConversation();

	const handleOutboundMessage = async ({ message }: { message: string }) => {
		if (!message.length) {
			return;
		}

		addOutboundMessage(message);

		if (sentCount > MESSAGE_LIMIT) {
			addInboundMessage({
				text: "You've reached your daily message limit with the Live Coach. Please upgrade your plan to send more messages!",
				action: {
					url: "/profile/plan",
					text: "Upgrade Plan",
				},
			});
		}
	};

	return { handleOutboundMessage };
}
