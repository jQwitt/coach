"use client";

import { determineTrainingIntent, viewAnalytics } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useConversation } from "@/hooks/stores/use-live-coach-conversation";
import { LiveCoachConversationPhase, LiveCoachSupportedActionsEnum } from "@/lib/types/live-coach";
import { Send } from "lucide-react";
import * as React from "react";

export interface MessageInputProps {
	actions?: Array<{
		key: LiveCoachSupportedActionsEnum;
		text: string;
	}>;
}

const DELAY_MIME = 500;
const inputLabels: Record<LiveCoachConversationPhase, string> = {
	[LiveCoachConversationPhase.DETERMINE_INTENT]: "Try 'View analytics for bench press'",
	[LiveCoachConversationPhase.CONFIRM_INTENT]: "Yes or No",
	[LiveCoachConversationPhase.PROMPT_ACTION_INTENT]: "Let's get a bit more info about your goal",
	[LiveCoachConversationPhase.FULFILL_INTENT]: "Working on it...",
	[LiveCoachConversationPhase.PROMPT_FULFILLMENT_SUCCESS]: "How'd it go?",
	[LiveCoachConversationPhase.END_CONVERSATION]: "Thanks for talking with coach!",
};

export default function MessageInput({ actions }: MessageInputProps) {
	const {
		conversation: { phase, isTyping, fulfillmentStarted },
		setIsTyping,
		addInboundMessage,
		addOutboundMessage,
		setPhase,
		setFullfillmentStarted,
	} = useConversation();
	const [userMessage, setUserMessage] = React.useState("");
	const [insight, setInsight] = React.useState({ intent: "", muscleGroup: "", exercise: "" });
	const [actionInProgress, setActionInProgress] = React.useState(false);
	const disableSend =
		actionInProgress || fulfillmentStarted || phase === LiveCoachConversationPhase.END_CONVERSATION;

	React.useEffect(() => {
		if (phase === LiveCoachConversationPhase.FULFILL_INTENT) {
			fulfill();
		}
	}, [phase]);

	const handleSend = async () => {
		if (userMessage.length) {
			addOutboundMessage(userMessage);
		}

		if (phase === LiveCoachConversationPhase.DETERMINE_INTENT) {
			setIsTyping(true);
			const insight = await determineTrainingIntent(userMessage);

			// if no insights availble, ask again
			if (!insight || !insight.intent) {
				addInboundMessage({ text: "Sorry I didn't get that, what can I help you with?" });
				return;
			}
			setIsTyping(false);

			const { intent, muscleGroup, exercise } = insight;
			addInboundMessage({
				text: `I think you're looking to ${intent}${exercise ? `, emphasizing ${exercise}` : ""}${muscleGroup ? `, targeting ${muscleGroup !== "none" ? muscleGroup : ""}` : ""}, is that right?`,
				info: {
					title: "AI Info",
					description: "OpenAI's model returned the following insights based on your message:",
					data: insight,
				},
			});
			setPhase(LiveCoachConversationPhase.CONFIRM_INTENT);
			setInsight(insight);
			setActionInProgress(true);
		} else if (phase === LiveCoachConversationPhase.CONFIRM_INTENT) {
			setIsTyping(true);

			if (userMessage.match(/yes/gi)) {
				setTimeout(() => {
					setIsTyping(false);
					setUserMessage("");
					addInboundMessage({ text: "Got it!" });
					setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
				}, DELAY_MIME);
				return;
			}

			setTimeout(() => {
				setIsTyping(false);
				addInboundMessage({ text: "Sorry, I didn't get that, what can I help you with?" });
			}, DELAY_MIME);
			setPhase(LiveCoachConversationPhase.DETERMINE_INTENT);
		} else if (phase === LiveCoachConversationPhase.PROMPT_ACTION_INTENT) {
			setInsight((prev) => ({ ...prev, exercise: userMessage }));
			setPhase(LiveCoachConversationPhase.FULFILL_INTENT);
		}

		setUserMessage("");
	};

	const fulfill = async () => {
		setIsTyping(true);

		if (phase === LiveCoachConversationPhase.FULFILL_INTENT && !fulfillmentStarted) {
			setFullfillmentStarted(true);
			const { intent, exercise } = insight;

			if (intent === LiveCoachSupportedActionsEnum.VIEW_ANALYTICS) {
				const res = await viewAnalytics(insight);
				if (res?.url) {
					addInboundMessage({
						text: `Click the button below to view your analytics for ${exercise} as requested`,
						action: { text: "View Analytics", url: res.url },
					});
				} else {
					addInboundMessage({
						text: `I counldn't find any analytics for ${insight.exercise} in your workout history.`,
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
				// handle case where intent is not supported
				addInboundMessage({
					text: "I'm sorry, I can't currently do this, but I'll keep learning :)",
				});
			}
		}

		setPhase(LiveCoachConversationPhase.END_CONVERSATION);
		setIsTyping(false);
	};

	const onActionClick = async ({ action }: { action: LiveCoachSupportedActionsEnum }) => {
		setIsTyping(true);
		setPhase(LiveCoachConversationPhase.PROMPT_ACTION_INTENT);
		setActionInProgress(true);
		addOutboundMessage(action);

		if (action === LiveCoachSupportedActionsEnum.VIEW_ANALYTICS) {
			setTimeout(() => {
				setInsight((prev) => ({ ...prev, intent: LiveCoachSupportedActionsEnum.VIEW_ANALYTICS }));
				addInboundMessage({
					text: "What exercise would you like to view analytics for?",
				});
				setIsTyping(false);
			}, DELAY_MIME);
		}
	};

	return (
		<div className="min-w-full">
			<div className="flex justify-between gap-2">
				<div className="relative w-full">
					<input
						type="text"
						className="peer w-full border-b-2 border-gray-300 pb-1 pt-3 text-gray-900 placeholder-transparent transition-colors focus:border-primary focus:outline-none"
						placeholder="Talk with the coach"
						value={userMessage}
						onChange={(e) => setUserMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSend();
						}}
					/>
					<Label
						htmlFor="userMessageInput"
						className="pointer-events-none absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
					>
						{inputLabels[phase as LiveCoachConversationPhase]}
					</Label>
				</div>
				<div>
					<Button size="icon" className="rounded-full" disabled={isTyping} onClick={handleSend}>
						<Send />
					</Button>
				</div>
			</div>
			<div className="mt-3 flex gap-2 overflow-x-none">
				{actions?.map(({ key, text }) => (
					<Button
						variant="outline"
						className="rounded-full border"
						key={`action-${key}`}
						onClick={() => onActionClick({ action: key })}
						disabled={disableSend}
					>
						{text}
					</Button>
				))}
			</div>
		</div>
	);
}
