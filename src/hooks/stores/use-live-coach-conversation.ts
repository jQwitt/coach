import type { MessageDirection } from "@/lib/types";
import { create } from "zustand";

type LiceCoachConversationMessage = {
	direction: MessageDirection;
	text: string;
};

interface LiveCoachConversationState {
	conversation: {
		conversationStarted: boolean;
		isTyping: boolean;
		messages: LiceCoachConversationMessage[];
	};
	setIsTyping: (isTyping: boolean) => void;
	startConversation: () => void;
	addOutboundMessage: (text: string) => void;
	addInboundMessage: (text: string) => void;
}

export const useConversation = create<LiveCoachConversationState>()((set) => ({
	conversation: {
		conversationStarted: false,
		isTyping: false,
		messages: [],
	},
	setIsTyping(isTyping) {
		set((state) => ({ conversation: { ...state.conversation, isTyping } }));
	},
	startConversation() {
		set((state) => ({
			conversation: {
				...state.conversation,
				conversationStarted: true,
			},
		}));
	},
	addOutboundMessage(text) {
		set((state) => ({
			conversation: {
				...state.conversation,
				messages: [...state.conversation.messages, { direction: "outbound", text }],
			},
		}));
	},
	addInboundMessage(text) {
		set((state) => ({
			conversation: {
				...state.conversation,
				messages: [...state.conversation.messages, { direction: "inbound", text }],
			},
		}));
	},
}));
