import { type LiceCoachConversationMessage, LiveCoachConversationPhase } from "@/lib/types";
import { create } from "zustand";

interface LiveCoachConversationState {
	conversation: {
		conversationStarted: boolean;
		isTyping: boolean;
		phase: LiveCoachConversationPhase;
		messages: LiceCoachConversationMessage[];
	};
	setIsTyping: (isTyping: boolean) => void;
	startConversation: () => void;
	addOutboundMessage: (text: string) => void;
	addInboundMessage: (text: string) => void;
	setPhase: (phase: LiveCoachConversationPhase) => void;
}

export const useConversation = create<LiveCoachConversationState>()((set) => ({
	conversation: {
		conversationStarted: false,
		isTyping: false,
		phase: LiveCoachConversationPhase.DETETMINE_INTENT,
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
	setPhase(phase) {
		set((state) => ({
			conversation: {
				...state.conversation,
				phase,
			},
		}));
	},
}));
