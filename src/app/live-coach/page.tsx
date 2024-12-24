import { getCurrentUser } from "@/app/actions";
import LiveCoachMessage from "@/components/blocks/messages/live-coach-message";
import MessageInput from "@/components/blocks/messages/message-input";
import Header from "@/components/ui/header";
import { SupportedActions } from "@/lib/open-ai";

export default async function LiveCoachPage() {
	const { firstName } = (await getCurrentUser()) || {};

	return (
		<div>
			<Header title={`Welcome back ${firstName}`} />
			<div className="flex flex-col items-start gap-1">
				<LiveCoachMessage
					messages={[
						"Hey there! I'm your personal coach.",
						"I can design a workout based on your training history, suggest alternative exercises, help improve your progress, show analytics, and much more.",
						"How can I help you today?",
					]}
					showAvatar
				/>
			</div>
			<div className="fixed bottom-5 w-full max-w-3xl pr-10">
				<MessageInput actions={SupportedActions} />
			</div>
		</div>
	);
}
