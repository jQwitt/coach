export type MessageDirection = "inbound" | "outbound";

export type LiveCoachConversationMessageAction = LiveCoachConversationMessageURLAction;

export type LiveCoachConversationMessageURLAction = {
	text: string;
	url: string;
};

export type LiceCoachConversationMessage = {
	direction: MessageDirection;
	text: string;
	info?: LiveCoachConversationMessageInfo;
	action?: LiveCoachConversationMessageAction;
};
export type LiveCoachConversationMessageInfo = {
	title: string;
	description: string;
	data: string;
};

export type LiveCoachFulfillmentFunction<T> = (insight: {
	muscleGroup: string;
	exercise: string;
}) => Promise<T>;
