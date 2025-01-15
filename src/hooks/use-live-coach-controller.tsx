"use client";

import { determineTrainingIntent, viewAnalytics } from "@/app/actions";
import {
	LIVE_COACH_DELAY_MIME,
	MESSAGE_LIMIT,
} from "@/components/controllers/live-coach-controller";
import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import { LiveCoachConversationPhase, LiveCoachSupportedActionsEnum } from "@/lib/types/live-coach";
import * as React from "react";

export function useLiveCoachController() {
	const {
		conversation: { sentCount, phase, fulfillmentStarted },
		addOutboundMessage,
		addInboundMessage,
		setIsTyping,
		setPhase,
		setFullfillmentStarted,
	} = useConversation();
	const [intentContext, setIntentContext] = React.useState({
		intent: "",
		muscleGroup: "",
		exercise: "",
	});

	const mimeTyping = (f: () => void) => {
		setIsTyping(true);
		setTimeout(() => {
			f?.();
			setIsTyping(false);
		}, LIVE_COACH_DELAY_MIME);
	};

	const fulfill = async () => {
		if (!fulfillmentStarted) {
			setFullfillmentStarted(true);
			const { intent, exercise } = intentContext;

			if (intent === LiveCoachSupportedActionsEnum.VIEW_ANALYTICS) {
				const res = await viewAnalytics(intentContext);
				if (res?.url) {
					addInboundMessage({
						text: `Click the button below to view your analytics for ${exercise} as requested`,
						action: { text: "View Analytics", url: res.url },
					});
				} else {
					addInboundMessage({
						text: `I counldn't find any analytics for ${exercise} in your workout history.`,
						action: { text: "Log a Workout", url: "/log-workout/lifting" },
					});

					// TODO: Recover Intent
				}
				// } else if (intent === LiveCoachSupportedActionsEnum.DESIGN_WORKOUT) {
				// 	designWorkout(insight);
				// } else if (intent === LiveCoachSupportedActionsEnum.VIEW_ANALYTICS) {
				// 	const res = await viewAnalytics(insight);
				// 	if (res?.url) {
				// 		addInboundMessage({
				// 			text: `Click the button below to view your analytics for ${exercise} as requested`,
				// 			action: { text: "View Analytics", url: res.url },
				// 		});
				// 	} else {
				// 		addInboundMessage({
				// 			text: `I counldn't find any analytics for ${insight.exercise} in your workout history.`,
				// 		});

				// 		// TODO: Recover Intent
				// 	}
				// } else if (intent === LiveCoachSupportedActionsEnum.DETERMINE_EXERCISE_WEIGHT) {
				// 	determineExerciseWeight(insight);
				// } else if (intent === LiveCoachSupportedActionsEnum.SUGGEST_EXERCISE) {
				// 	suggestExercise(insight);
			} else {
				addInboundMessage({
					text: "I'm sorry, I can't currently do this, but I'll keep learning :)",
				});
			}
		}

		setPhase(LiveCoachConversationPhase.END_CONVERSATION);
		setIsTyping(false);
	};

	const handleOutboundMessage = async ({ message }: { message: string }) => {
		if (!message.length) {
			return;
		}

		addOutboundMessage(message);

		if (sentCount > MESSAGE_LIMIT) {
			mimeTyping(() =>
				addInboundMessage({
					text: "You've reached your daily message limit with the Live Coach. Please upgrade your plan to send more messages!",
					action: {
						url: "/profile/plan",
						text: "Upgrade Plan",
					},
				}),
			);
			return;
		}

		if (phase === LiveCoachConversationPhase.DETERMINE_INTENT) {
			setIsTyping(true);
			const insight = await determineTrainingIntent(message);

			// if no insights availble, ask again
			if (!insight || !insight.intent) {
				mimeTyping(() =>
					addInboundMessage({ text: "Sorry I didn't get that, what can I help you with?" }),
				);
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
				setIsTyping(false);

				mimeTyping(() => {
					addInboundMessage({ text: "Got it!" });
				});
				await fulfill();
				return;
			}

			setPhase(LiveCoachConversationPhase.DETERMINE_INTENT);
			mimeTyping(() => {
				addInboundMessage({
					text: "Sorry, I didn't get that, what can I help you with?",
				});
			});
		}
		// } else if (phase === LiveCoachConversationPhase.PROMPT_ACTION_INTENT) {
		// 	setIntentContext((prev) => ({ ...prev, exercise: message }));
		// 	setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
		// }
	};

	return { handleOutboundMessage };
}
