import coachAvatar from "../../../public/images/dumbbell_black_avatar.png";
import { Message, MessageProps } from "./message";
import { Avatar, AvatarImage } from "../ui/avatar";

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
          <Avatar className="w-12 h-12 rounded-full border border-muted-foreground p-2 mt-2">
            <AvatarImage src={coachAvatar.src} alt="Coach avatar" />
          </Avatar>
        </div>
      )}
      <div className="col-span-7 flex flex-col space-y-1">
        {messages?.map((text, i) => {
          const props = {
            text,
            ear: i === messages.length - 1,
          } satisfies MessageProps;

          return <Message {...props} />;
        })}
      </div>
    </div>
  );
}
