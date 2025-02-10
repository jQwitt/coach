import { getUserProfile } from "@/app/actions";
import LiveCoachConversation from "@/components/blocks/messages/live-coach-conversation";
import MessageInput from "@/components/blocks/messages/message-input";
import Header from "@/components/ui/header";
import { LiveCoachSupportedActionsEnum } from "@/lib/types/live-coach";
import { Sparkle, Sparkles } from "lucide-react";

const quickActions = [
	{
		key: LiveCoachSupportedActionsEnum.DETERMINE_EXERCISE_WEIGHT,
		text: "How heavy should I be lifting?",
	},
	{
		key: LiveCoachSupportedActionsEnum.SUGGEST_EXERCISE,
		text: "Suggest an Exercise",
	},
	{ 
		key: LiveCoachSupportedActionsEnum.VIEW_ANALYTICS, 
		text: "View Analytics" 
	},
];

function formatPlan(subscriptionPlan?: string) {
	if (subscriptionPlan === "olympian") {
		return (
			<div className="mb-2 flex gap-1 items-center">
				<p className="text-sm font-medium tracking-wide text-indigo-500">Olympian Tier</p>
				<Sparkles size={16} className="fill-indigo-500 text-indigo-500" />
			</div>
		);
	}

	if (subscriptionPlan === "builder") {
		return (
			<div className="mb-2 flex gap-0 items-center">
				<p className="text-sm font-medium tracking-wide text-blue-500">Builder Tier</p>
				<Sparkle size={16} className="fill-blue-500 text-blue-500" />
			</div>
		);
	}

	return <p className="mb-2 text-sm font-medium tracking-wide text-muted-foreground">Free Tier</p>;
}

export default async function LiveCoachPage() {
	const { firstName, subscription } = (await getUserProfile()) || {
		exercises: [],
		subscription: {},
	};
	const { name: subscriptionName } = subscription || {};

	return (
		<div className="flex flex-col justify-end min-h-[70dvh] pb-14">
			<div className="-mx-4 px-4 pb-2 sticky top-16 z-10 bg-background shadow-sm">
				<Header title="Live Coach" className="items-end" itemsEnd>
					{formatPlan(subscriptionName)}
				</Header>

				<p className="-mt-4 text-xs text-muted-foreground">
					Live Coach is an AI fitness companion and personal trainer. You can ask it questions about
					your fitness goals, workouts, and progress to optimize your training.
				</p>
			</div>
			<div className="mt-6">
				<LiveCoachConversation userFirstName={firstName} />
			</div>
			<div className="fixed bottom-0 w-full max-w-3xl bg-white -mx-4 p-4 pt-6 self-center">
				<MessageInput actions={quickActions} />
			</div>
		</div>
	);
}
