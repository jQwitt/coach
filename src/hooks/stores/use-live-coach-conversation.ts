import type {
	LiceCoachConversationMessage,
	LiveCoachConversationMessageAction,
	LiveCoachConversationMessageInfo,
} from "@/lib/types";
import { LiveCoachConversationPhase } from "@/lib/types";
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
	addInboundMessage: (params: {
		text: string;
		info?: LiveCoachConversationMessageInfo;
		action?: LiveCoachConversationMessageAction;
	}) => void;
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
	addInboundMessage({ text, info, action }) {
		set((state) => {
			const toSet: LiveCoachConversationMessageInfo = {
				title: "",
				description: "",
				data: "",
				...info,
			};

			return {
				conversation: {
					...state.conversation,
					messages: [
						...state.conversation.messages,
						{ direction: "inbound", text, info: toSet, action },
					],
				},
			};
		});
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
