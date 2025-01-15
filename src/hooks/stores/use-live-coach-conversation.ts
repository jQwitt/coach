import type {
	LiceCoachConversationMessage,
	LiveCoachConversationMessageAction,
	LiveCoachConversationMessageInfo,
} from "@/lib/types";
import { LiveCoachConversationPhase } from "@/lib/types";
import type { MessageDirection } from "@/lib/types/live-coach";
import { create } from "zustand";

interface LiveCoachConversationState {
	conversation: {
		conversationStarted: boolean;
		isTyping: boolean;
		phase: LiveCoachConversationPhase;
		messages: LiceCoachConversationMessage[];
		fulfillmentStarted: boolean;
		intent?: string;
	};
	setIsTyping: (isTyping: boolean) => void;
	startConversation: () => void;
	startConversationWithIntent: (params: { userFirstName?: string; intent: string }) => void;
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
		intent: "",
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
	startConversationWithIntent({ userFirstName, intent }) {
		set((state) => {
			const {
				conversation: { conversationStarted },
			} = state;
			if (conversationStarted) {
				return state;
			}

			const messages = [];
			if (userFirstName) {
				messages.push(
					{
						direction: "inbound" as MessageDirection,
						text: `Hi, ${userFirstName}! I'm your Coach.`,
					},
					{
						direction: "inbound" as MessageDirection,
						text: intent
							? `I think you're looking to ${intent}, is that right?`
							: "How can I help you today?",
					},
				);
			}

			return {
				conversation: {
					...state.conversation,
					conversationStarted: true,
					intent,
					messages,
				},
			};
		});
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
