"use client";

import {
	determineExerciseWeight,
	determineTrainingIntent,
	logConversation,
	viewAnalytics,
} from "@/app/actions";
import {
	LIVE_COACH_DELAY_MIME,
	MESSAGE_LIMIT,
} from "@/components/controllers/live-coach-controller";
import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import { timeStamp } from "@/lib/encoding";
import {
	type LiveCoachConversationMessageAction,
	type LiveCoachConversationMessageInfo,
	LiveCoachConversationPhase,
	LiveCoachSupportedActionsEnum,
} from "@/lib/types/live-coach";
import * as React from "react";

export function useLiveCoachController() {
	const {
		conversation: { sentCount, phase, fulfillmentStarted, intentContext },
		addOutboundMessage,
		addInboundMessage,
		setIsTyping,
		setIntentContext,
		resetIntentContext,
		setPhase,
		setFullfillmentStarted,
	} = useConversation();

	const mimeTyping = React.useCallback(
		(
			text: string,
			options?: {
				action?: LiveCoachConversationMessageAction;
				info?: LiveCoachConversationMessageInfo;
			},
		) => {
			setIsTyping(true);
			setTimeout(() => {
				let payload: {
					text: string;
					action?: LiveCoachConversationMessageAction;
					info?: LiveCoachConversationMessageInfo;
				} = { text };
				if (options?.action) {
					payload = { ...payload, action: options.action };
				}
				if (options?.info) {
					payload = { ...payload, info: options.info };
				}

				addInboundMessage(payload);
				setIsTyping(false);
			}, LIVE_COACH_DELAY_MIME);
		},
		[setIsTyping, addInboundMessage],
	);

	const fulfill = React.useCallback(async () => {
		if (!fulfillmentStarted) {
			mimeTyping("Working on it...");
			setFullfillmentStarted(true);
			const { intent, exercise } = intentContext;

			if (intent === LiveCoachSupportedActionsEnum.VIEW_ANALYTICS) {
				const res = await viewAnalytics(intentContext);

				if (res?.url) {
					mimeTyping(`Click the button below to view your analytics for ${exercise} as requested`, {
						action: { text: "View Analytics", url: res.url },
					});
				} else {
					mimeTyping(`I counldn't find any analytics for ${exercise} in your workout history.`, {
						action: { text: "Log a Workout", url: "/log-workout/lifting" },
					});
				}
			} else if (intent === LiveCoachSupportedActionsEnum.DETERMINE_EXERCISE_WEIGHT) {
				const res = await determineExerciseWeight(intentContext);

				if (res?.oneRepMax.length) {
					// case where their ORM can be easily calculated
					mimeTyping(
						`Looking at your ${exercise} history, you last logged at least 10 reps at ${res.last} lbs, nice.
						\n\n
						Based on this, I've calculated your One Rep Max to be ${res.oneRepMax} lbs!`,
						{
							info: {
								title: "How is this calculated",
								description:
									"This formula was taken from https://personaltrainertoday.com/calculating-a-clients-1rm, we recommend following their safety guidlines, as ORM's aren't totally precise",
								data: "",
							},
						},
					);
					mimeTyping(
						`I recommend your working sets to be around ${res.recommended} lbs. to best target hypertrophy.`,
						{
							action: {
								text: "Log a Workout",
								url: "/log-workout/lifting",
							},
						},
					);
				} else if (res?.last.length) {
					// case where a user needs to log more reps to calculate their ORM
					mimeTyping(
						`Looking at your ${exercise} history, your most recent weight was ${res.last} lbs.`,
					);
					mimeTyping(
						"In order to calculate your One Rep Max, I need you to log at least 10 reps of this exercise.",
						{ action: { text: "Log a Workout", url: "/log-workout/lifting" } },
					);
				} else {
					mimeTyping(`I counldn't find any analytics for ${exercise} in your workout history.`, {
						action: { text: "Log a Workout", url: "/log-workout/lifting" },
					});
				}

				// } else if (intent === LiveCoachSupportedActionsEnum.DESIGN_WORKOUT) {
				// 	const res = await designWorkout(intentContext);
				// } else if (intent === LiveCoachSupportedActionsEnum.SUGGEST_EXERCISE) {
				// 	const res = suggestExercise(intentContext);
			} else {
				mimeTyping("I'm sorry, I can't currently do this, but I'll keep learning :)");
			}

			setPhase(LiveCoachConversationPhase.END_CONVERSATION);
			await logConversation({ date: timeStamp(), intent });
		}
	}, [mimeTyping, fulfillmentStarted, intentContext, setFullfillmentStarted, setPhase]);

	React.useLayoutEffect(() => {
		if (phase === LiveCoachConversationPhase.FULFILL_INTENT) {
			fulfill();
		}
	}, [phase, fulfill]);

	const handleOutboundMessage = React.useCallback(
		async ({ message }: { message: string }) => {
			if (!message.length) {
				return;
			}

			addOutboundMessage(message);

			if (sentCount > MESSAGE_LIMIT) {
				mimeTyping(
					"You've reached your daily message limit with the Live Coach. Please upgrade your plan to send more messages!",
					{
						action: {
							url: "/profile/plan",
							text: "Upgrade Plan",
						},
					},
				);
				return;
			}

			if (phase === LiveCoachConversationPhase.DETERMINE_INTENT) {
				setIsTyping(true);
				const insight = await determineTrainingIntent(message);

				// if no insights availble, ask again
				if (!insight || !insight.intent) {
					mimeTyping("Sorry I didn't get that, what can I help you with?");
					return;
				}

				const { intent, muscleGroup, exercise } = insight;
				setIntentContext(insight);
				setPhase(LiveCoachConversationPhase.CONFIRM_INTENT);
				setIsTyping(false);

				// no need to mime, have to await earlier API call
				addInboundMessage({
					text: `I think you're looking to ${intent}${exercise ? `, emphasizing ${exercise}` : ""}${muscleGroup ? `, targeting ${muscleGroup !== "none" ? muscleGroup : ""}` : ""}, is that right?`,
					info: {
						title: "AI Info",
						description: "OpenAI's model returned the following insights based on your message:",
						data: insight,
					},
				});
			} else if (phase === LiveCoachConversationPhase.CONFIRM_INTENT) {
				if (message.match(/yes/gi)) {
					setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
					return;
				}

				setPhase(LiveCoachConversationPhase.DETERMINE_INTENT);
				mimeTyping("Sorry, I didn't get that, what can I help you with?");
			} else if (phase === LiveCoachConversationPhase.PROMPT_ACTION_INTENT) {
				setIntentContext({ ...intentContext, exercise: message });
				setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
			} else if (phase === LiveCoachConversationPhase.PROMPT_URL_INTENT) {
				if (message.match(/yes/gi)) {
					setPhase(LiveCoachConversationPhase.CONFIRM_URL_INTENT);
					mimeTyping(`What exercise do you want to ${intentContext.intent} for?`);
					return;
				}

				setPhase(LiveCoachConversationPhase.DETERMINE_INTENT);
				resetIntentContext();
				mimeTyping("What can I assist you with?");
			} else if (phase === LiveCoachConversationPhase.CONFIRM_URL_INTENT) {
				setIntentContext({ ...intentContext, exercise: message });
				setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
			}
		},
		[
			setIsTyping,
			mimeTyping,
			addInboundMessage,
			addOutboundMessage,
			sentCount,
			phase,
			setPhase,
			intentContext,
			setIntentContext,
			resetIntentContext,
		],
	);

	const handleActionClick = React.useCallback(
		({ action }: { action: LiveCoachSupportedActionsEnum }) => {
			setPhase(LiveCoachConversationPhase.PROMPT_ACTION_INTENT);
			addOutboundMessage(action);

			if (action === LiveCoachSupportedActionsEnum.VIEW_ANALYTICS) {
				setTimeout(() => {
					setIntentContext({
						...intentContext,
						intent: LiveCoachSupportedActionsEnum.VIEW_ANALYTICS,
					});
					mimeTyping("What exercise would you like to view analytics for?");
				}, LIVE_COACH_DELAY_MIME);
			} else if (action === LiveCoachSupportedActionsEnum.DETERMINE_EXERCISE_WEIGHT) {
				setTimeout(() => {
					setIntentContext({
						...intentContext,
						intent: LiveCoachSupportedActionsEnum.DETERMINE_EXERCISE_WEIGHT,
					});
					mimeTyping("What exercise would you like calculate?");
				}, LIVE_COACH_DELAY_MIME);
			}
		},
		[setPhase, addOutboundMessage, mimeTyping, intentContext, setIntentContext],
	);

	return { handleOutboundMessage, handleActionClick };
}
