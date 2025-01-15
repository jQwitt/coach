import { getCurrentUser, getPlanInfo } from "@/app/actions";
import LiveCoachConversation from "@/components/blocks/messages/live-coach-conversation";
import MessageInput from "@/components/blocks/messages/message-input";
import Header from "@/components/ui/header";
import { LiveCoachSupportedActionsEnum } from "@/lib/types/live-coach";
import { Crown } from "lucide-react";

export default async function LiveCoachPage() {
	const { firstName, plan } = (await getCurrentUser()) || {};
	const { name: planName } = (await getPlanInfo({ planId: String(plan ?? -1) })) || {};
	const formattedPlanName = planName ? planName[0].toUpperCase() + planName.slice(1) : null;
	const planColor =
		planName === "free"
			? "text-muted-foreground"
			: planName === "olympian"
				? "text-indigo-500"
				: "text-foreground";

	const quickActions = [
		{ key: LiveCoachSupportedActionsEnum.VIEW_ANALYTICS, text: "View Analytics" },
		{
			key: LiveCoachSupportedActionsEnum.DETERMINE_EXERCISE_WEIGHT,
			text: "Determine Exercise Weight",
		},
	];

	return (
		<div suppressHydrationWarning className="flex flex-col justify-end min-h-[70dvh] pb-14">
			<div className="-mx-4 px-4 pb-2 sticky top-16 z-10 bg-background shadow-sm">
				<div className="flex gap-1 items-end">
					<Header title="Live Coach" />
					{formattedPlanName && (
						<div className="mb-6 flex gap-1 items-center">
							<p className={`text-sm font-medium tracking-wide ${planColor}`}>
								{formattedPlanName}
							</p>
							<Crown size={16} className="text-indigo-500 fill-indigo-500" />
						</div>
					)}
				</div>
				<p className="-mt-4 text-xs text-muted-foreground">
					Live Coach is an AI fitness companion and personal trainer. You can ask it questions about
					your fitness goals, workouts, and progress to optimize your training.
				</p>
			</div>
			<div className="mt-6">
				<LiveCoachConversation userFirstName={firstName} />
			</div>
			<div className="fixed bottom-0 w-full max-w-3xl bg-white -mx-4 p-4 pt-6">
				<MessageInput actions={quickActions} />
			</div>
		</div>
	);
}
