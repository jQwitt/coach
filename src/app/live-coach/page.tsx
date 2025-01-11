import { getCurrentUser } from "@/app/actions";
import LiveCoachConversation from "@/components/blocks/messages/live-coach-conversation";
import MessageInput from "@/components/blocks/messages/message-input";
import Header from "@/components/ui/header";
import { SupportedActions } from "@/lib/open-ai";

export default async function LiveCoachPage() {
	const { firstName } = (await getCurrentUser()) || {};

	return (
		<div suppressHydrationWarning>
			<Header title="Live Coach" />
			<p className="-mt-4 text-xs text-muted-foreground">
				Live Coach is an AI fitness companion and personal trainer. You can ask it questions about
				your fitness goals, workouts, and progress to optimize your training.
			</p>
			<div className="mt-6 flex flex-col items-start gap-1">
				<LiveCoachConversation userFirstName={firstName} />
			</div>
			<div className="fixed bottom-5 w-full max-w-3xl pr-10">
				<MessageInput actions={SupportedActions} />
			</div>
		</div>
	);
}
