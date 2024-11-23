import Header from "@/components/ui/header";
import { getCurrentUser } from "@/app/actions";
import LiveCoachMessage from "@/components/messages/live-coach-message";
import MessageInput from "@/components/messages/message-input";

export default async function LiveCoachPage() {
  const { firstName } = (await getCurrentUser()) || {};

  return (
    <div>
      <Header title={`Welcome back ${firstName}`} />
      <div className="flex flex-col gap-1 items-start">
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
