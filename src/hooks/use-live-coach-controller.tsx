"use client";

import {
	determineExerciseWeight,
	determineTrainingIntent,
	isConversationLimitReached,
	logConversation,
	suggestExercise,
	viewAnalytics,
} from "@/app/actions";
import { LIVE_COACH_DELAY_MIME } from "@/components/controllers/live-coach-controller";
import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import { yesterday } from "@/lib/dates";
import { timeStamp } from "@/lib/encoding";
import {
	type LiveCoachConversationMessageAction,
	type LiveCoachConversationMessageInfo,
	LiveCoachConversationPhase,
	LiveCoachSupportedActionsEnum,
} from "@/lib/types/live-coach";
import { generateExerciseCards } from "@/lib/utils";
import * as React from "react";

export function useLiveCoachController() {
	const {
		conversation: { phase, fulfillmentStarted, intentContext, limited },
		addOutboundMessage,
		addInboundMessage,
		setIsTyping,
		setIntentContext,
		resetIntentContext,
		setPhase,
		setFullfillmentStarted,
		limit,
	} = useConversation();
	const [hasCheckedLimit, setHasCheckedLimit] = React.useState(false);

	React.useEffect(() => {
		verify();
	}, []);

	const verify = React.useCallback(async () => {
		if (!hasCheckedLimit) {
			setHasCheckedLimit(true);
			const isLimited = await isConversationLimitReached(yesterday());
			if (isLimited) {
				limit();
			}
		}
	}, [hasCheckedLimit, limit]);

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
			addInboundMessage({ text: "Working on it..." });
			setFullfillmentStarted(true);
			setIsTyping(true);
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
				setIsTyping(false);
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
				setIsTyping(false);

				// } else if (intent === LiveCoachSupportedActionsEnum.DESIGN_WORKOUT) {
				// 	const res = await designWorkout(intentContext);
			} else if (intent === LiveCoachSupportedActionsEnum.SUGGEST_EXERCISE) {
				const { muscleGroup } = intentContext;
				const res = await suggestExercise(intentContext);

				if (!res?.exercises?.length) {
					setIsTyping(false);
					mimeTyping(
						"The coach isn't familiar with that muscle group yet, let's try something else!",
					);
					return;
				}
				const cards = generateExerciseCards(res.exercises);
				if (!cards.length) {
					addInboundMessage({
						text: `To target ${muscleGroup}, I'd suggest the following exercises:`,
						info: {
							title: "AI Info",
							description: "OpenAI's model returned the following insights based on your message:",
							data: res.exercises.toString(),
						},
						cards,
					});
				} else {
					addInboundMessage({
						text: `To target ${muscleGroup}, I'd suggest the following exercises:`,
						info: {
							title: "AI Info",
							description: "OpenAI's model returned the following insights based on your message:",
							data: res.exercises
								.map(({ name, description }) => ({ name, description }))
								.toString(),
						},
						action: { text: "Log a Workout", url: "/log-workout/lifting" },
						cards,
					});
				}
				setIsTyping(false);
			} else {
				setIsTyping(false);
				mimeTyping("I'm sorry, I can't currently do this, but I'll keep learning :)");
			}

			setPhase(LiveCoachConversationPhase.END_CONVERSATION);
			await logConversation({ date: timeStamp(), intent });
		}
	}, [
		setIsTyping,
		mimeTyping,
		fulfillmentStarted,
		intentContext,
		setFullfillmentStarted,
		setPhase,
		addInboundMessage,
	]);

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

			if (limited) {
				mimeTyping(
					"You've reached your daily conversation limit. Please upgrade your plan to continue using Live Coach, or wait until tomorrow.",
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
				if (!message.match(/yes/gi)) {
					setPhase(LiveCoachConversationPhase.DETERMINE_INTENT);
					mimeTyping("Sorry, I didn't get that, what can I help you with?");
					return;
				}

				const { exercise, muscleGroup } = intentContext;
				if (intentContext.intent === LiveCoachSupportedActionsEnum.VIEW_ANALYTICS) {
					if (!exercise) {
						setPhase(LiveCoachConversationPhase.PROMPT_MISSING_INTENT_EXERCISE);
						mimeTyping("What exercise would you like to view analytics for?");
						return;
					}
				}
				if (intentContext.intent === LiveCoachSupportedActionsEnum.SUGGEST_EXERCISE) {
					if (!muscleGroup) {
						setPhase(LiveCoachConversationPhase.PROMPT_MISSING_INTENT_EXERCISE);
						mimeTyping("What muscle group would you like me to suggest an exercise for?");
						return;
					}
				}

				setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
			} else if (phase === LiveCoachConversationPhase.PROMPT_MISSING_INTENT_EXERCISE) {
				// TODO: verify contains exercise
				setIntentContext({ ...intentContext, exercise: message });
				setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
			} else if (phase === LiveCoachConversationPhase.PROMPT_MISSING_INTENT_MUSCLE_GROUP) {
				// TODO: verify contains exercise
				setIntentContext({ ...intentContext, muscleGroup: message });
				setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
			} else if (phase === LiveCoachConversationPhase.PROMPT_URL_INTENT) {
				const userConfirmed = message.match(/yes/gi);

				if (!userConfirmed) {
					setPhase(LiveCoachConversationPhase.DETERMINE_INTENT);
					resetIntentContext();
					mimeTyping("Sorry about that, what can I assist you with?");
					return;
				}

				const { intent } = intentContext;
				if (intent !== LiveCoachSupportedActionsEnum.SUGGEST_EXERCISE) {
					setPhase(LiveCoachConversationPhase.CONFIRM_URL_INTENT);
					mimeTyping(`What exercise do you want to ${intentContext.intent} for?`);
					return;
				}

				setPhase(LiveCoachConversationPhase.PROMPT_MISSING_INTENT_MUSCLE_GROUP);
				mimeTyping("What muscle group do you want to suggest an exercise for?");
			} else if (phase === LiveCoachConversationPhase.CONFIRM_URL_INTENT) {
				// TODO: verify contains exercise
				setIntentContext({ ...intentContext, exercise: message });
				setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
			}
		},
		[
			limited,
			setIsTyping,
			mimeTyping,
			addInboundMessage,
			addOutboundMessage,
			phase,
			setPhase,
			intentContext,
			setIntentContext,
			resetIntentContext,
		],
	);

	const handleActionClick = React.useCallback(
		({ action }: { action: LiveCoachSupportedActionsEnum }) => {
			addOutboundMessage(action);

			if (limited) {
				mimeTyping(
					"You've reached your daily conversation limit. Please upgrade your plan to continue using Live Coach, or wait until tomorrow.",
					{
						action: {
							url: "/profile/plan",
							text: "Upgrade Plan",
						},
					},
				);
				return;
			}

			if (action === LiveCoachSupportedActionsEnum.VIEW_ANALYTICS) {
				setTimeout(() => {
					setIntentContext({
						...intentContext,
						intent: LiveCoachSupportedActionsEnum.VIEW_ANALYTICS,
					});
					mimeTyping("What exercise would you like to view analytics for?");
				}, LIVE_COACH_DELAY_MIME);
				setPhase(LiveCoachConversationPhase.CONFIRM_URL_INTENT);
			} else if (action === LiveCoachSupportedActionsEnum.DETERMINE_EXERCISE_WEIGHT) {
				setTimeout(() => {
					setIntentContext({
						...intentContext,
						intent: LiveCoachSupportedActionsEnum.DETERMINE_EXERCISE_WEIGHT,
					});
					mimeTyping("What exercise would you like calculate?");
				}, LIVE_COACH_DELAY_MIME);
				setPhase(LiveCoachConversationPhase.PROMPT_MISSING_INTENT_EXERCISE);
			} else if (action === LiveCoachSupportedActionsEnum.SUGGEST_EXERCISE) {
				setTimeout(() => {
					setIntentContext({
						...intentContext,
						intent: LiveCoachSupportedActionsEnum.SUGGEST_EXERCISE,
					});
					mimeTyping("What muscle group would you like me to suggest an exercise for?");
				}, LIVE_COACH_DELAY_MIME);
				setPhase(LiveCoachConversationPhase.PROMPT_MISSING_INTENT_MUSCLE_GROUP);
			}
		},
		[setPhase, addOutboundMessage, mimeTyping, intentContext, setIntentContext, limited],
	);

	return { handleOutboundMessage, handleActionClick };
}
