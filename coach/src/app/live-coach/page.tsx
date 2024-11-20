import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions";
import { heading } from "../fonts";
import LiveCoachMessage from "@/components/messages/live-coach-message";
import MessageInput from "@/components/messages/message-input";

export default async function LiveCoachPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { firstName } = user;

  return (
    <div className="space-y-4 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <h3 className={`${heading.className} text-6xl text-primary m-4`}>
        Welcome back {firstName}
      </h3>
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
