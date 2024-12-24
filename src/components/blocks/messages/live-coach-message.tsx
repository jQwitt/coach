import { Avatar, AvatarImage } from "@/components/ui/avatar";
import coachAvatar from "../../../../public/images/dumbbell_black_avatar.png";
import { Message, type MessageProps } from "./message";

interface LiveCoachMessageProps {
	messages: string[];
	showAvatar?: boolean;
}

export default function LiveCoachMessage({
	messages,
	showAvatar = false,
}: LiveCoachMessageProps & Readonly<{ children?: React.ReactNode }>) {
	return (
		<div className="grid grid-cols-8 items-end">
			{showAvatar && (
				<div className="col-span-1">
					<Avatar className="mt-2 h-12 w-12 rounded-full border border-muted-foreground p-2">
						<AvatarImage src={coachAvatar.src} alt="Coach avatar" />
					</Avatar>
				</div>
			)}
			<div className="col-span-7 flex flex-col space-y-2">
				{messages?.map((text, i) => {
					const props = {
						text,
						ear: i === messages.length - 1,
					} satisfies MessageProps;

					return <Message {...props} key={`coach-live-message-${i}`} />;
				})}
			</div>
		</div>
	);
}
