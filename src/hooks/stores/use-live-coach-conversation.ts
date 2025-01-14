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
		fulfillmentStarted: boolean;
	};
	setIsTyping: (isTyping: boolean) => void;
	startConversation: () => void;
	setFullfillmentStarted: (fulfillmentStarted: boolean) => void;
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
		phase: LiveCoachConversationPhase.DETERMINE_INTENT,
		messages: [],
		fulfillmentStarted: false,
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
	setFullfillmentStarted(fulfillmentStarted) {
		set((state) => ({
			conversation: {
				...state.conversation,
				fulfillmentStarted,
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
