import { getCurrentUser } from "@/app/actions";
import LiveCoachMessage from "@/components/blocks/messages/live-coach-message";
import MessageInput from "@/components/blocks/messages/message-input";
import Header from "@/components/ui/header";

export default async function LiveCoachPage() {
	const { firstName } = (await getCurrentUser()) || {};

	return (
		<div>
			<Header title={`Welcome back ${firstName}`} />
			<div className="flex flex-col items-start gap-1">
				<LiveCoachMessage
					messages={[
						"It's good to see you again - lets get back to training!",
						"What would you like to work on today?",
					]}
					showAvatar
				/>
			</div>
			<div className="fixed bottom-5 w-full max-w-3xl pr-10">
				<MessageInput actions={["Start workout", "View analytics"]} />
			</div>
		</div>
	);
}
