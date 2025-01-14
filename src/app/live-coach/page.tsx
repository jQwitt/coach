import { getCurrentUser } from "@/app/actions";
import LiveCoachConversation from "@/components/blocks/messages/live-coach-conversation";
import MessageInput from "@/components/blocks/messages/message-input";
import Header from "@/components/ui/header";
import { LiveCoachSupportedActionsEnum } from "@/lib/types";

export default async function LiveCoachPage() {
	const { firstName } = (await getCurrentUser()) || {};

	const quickActions = [
		{ key: LiveCoachSupportedActionsEnum.VIEW_ANALYTICS, text: "View Analytics" },
	];

	return (
		<div suppressHydrationWarning className="flex flex-col justify-end min-h-[70dvh] pb-14">
			<div className="-mx-4 px-4 pb-2 sticky top-16 z-10 bg-background shadow-sm">
				<Header title="Live Coach" />
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
