"use client";

import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import * as React from "react";

export const LIVE_COACH_DELAY_MIME = 200;
export const SCROLL_TO_LAST_ID = "coach-live-message-last";

export function LiveCoachController() {
	const {
		conversation: { messages },
	} = useConversation();

	const [isMounted, setIsMounted] = React.useState(false);
	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	React.useEffect(() => {
		// wait to autoScroll until mounted and there are messages
		if (isMounted && messages.length) {
			const last = document.getElementById(SCROLL_TO_LAST_ID);
			if (last) {
				last.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [isMounted, messages.length]);

	return null;
}
