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

export enum LiveCoachConversationPhase {
	/**
	 * DETERMINE_INTENT
	 *
	 * Indicates the start of the intent fulfillment flow
	 */
	DETERMINE_INTENT = "determine_intent",

	/**
	 * CONFIRM_INTENT
	 *
	 * Indicates the user is currently confirming if the correct intent has been determined
	 */
	CONFIRM_INTENT = "confirm_intent",

	/**
	 * PROMPT_ACTION_INTENT
	 *
	 * Indicates that a quick action was clicked, supplying intent, but that there is still data needed
	 * to complete the action.
	 */
	PROMPT_ACTION_INTENT = "prompt_action_intent",

	/**
	 * PROMPT_URL_INTENT
	 *
	 * Indicates that the user is being prompted to complete the missing data that wasn't supplied in the URL
	 */
	PROMPT_URL_INTENT = "prompt_url_intent",

	/**
	 * CONFIRM_URL_INTENT
	 *
	 * Indicates that the user is appoving the completed request context before fulfillment
	 */
	CONFIRM_URL_INTENT = "confirm_url_intent",

	/**
	 * FULFILL_INTENT
	 *
	 * Indicates that an action is being performed, after correctly intuited by code and approved by the user.
	 */
	FULFILL_INTENT = "fulfill_intent",

	/**
	 * PROMPT_FULFILLMENT_SUCCESS
	 *
	 * Indicates that an action was completed successfully and waiting for user feedback.
	 */
	PROMPT_FULFILLMENT_SUCCESS = "prompt_fulfillment_success",

	/**
	 * END_CONVERSATION
	 *
	 * Indicates the action was completed and no further actions can be taken.
	 */
	END_CONVERSATION = "end_conversation",
}
export enum LiveCoachSupportedActionsEnum {
	DESIGN_WORKOUT = "design a workout",
	VIEW_ANALYTICS = "view analytics",
	SUGGEST_EXERCISE = "suggest an exercise",
	DETERMINE_EXERCISE_WEIGHT = "determine exercise weight",
}

export const LiveCoachSupportedActions = (
	Object.keys(LiveCoachSupportedActionsEnum) as Array<keyof typeof LiveCoachSupportedActionsEnum>
).map((key) => ({ value: key, key: LiveCoachSupportedActionsEnum[key] }));
