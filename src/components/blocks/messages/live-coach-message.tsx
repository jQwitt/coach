"use client";

import ActionButton from "@/components/ui/buttons/action-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type {
	LiveCoachConversationMessageAction,
	LiveCoachConversationMessageInfo,
	MessageDirection,
} from "@/lib/types/live-coach";
import { HelpCircle } from "lucide-react";
import type * as React from "react";

export interface LiveCoachMessageProps {
	text: string;
	direction?: MessageDirection;
	ear?: boolean;
	className?: string;
	info?: LiveCoachConversationMessageInfo;
	action?: LiveCoachConversationMessageAction;
	cards?: React.ReactNode[];
	id?: string;
}

export function LiveCoachMessage({
	text,
	direction = "inbound",
	action,
	cards,
	ear = false,
	info = undefined,
	children,
	className,
	id,
}: LiveCoachMessageProps &
	Readonly<{
		children?: React.ReactNode;
	}>) {
	return (
		<>
			<div
				className={`${ear ? (direction === "inbound" ? "rounded-bl-none " : "rounded-br-none ") : ""} ${direction === "inbound" ? "self-start " : "self-end bg-black text-white"} relative text-sm w-fit max-w-[75%] shadow-md rounded-md outline outline-1 outline-slate-300 px-3 py-2 ${info?.title ? "pb-6" : ""} ${className}`}
				id={id}
			>
				{text}
				{children}
				{info?.title && (
					<div className="absolute bottom-1 right-1 hover:underline">
						<Popover>
							<PopoverTrigger className="flex items-center gap-1 text-muted-foreground text-sm opacity-90">
								{info.title}
								<HelpCircle size={14} />
							</PopoverTrigger>
							<PopoverContent className="text-xs text-muted-foreground p-2">
								<>
									<p className="mb-2">{info.description}</p>
									{Object.entries(info.data).map(([key, value]) => (
										<div key={key}>
											<b>{key}</b>: <b className="font-semibold">{value}</b>
										</div>
									))}
								</>
							</PopoverContent>
						</Popover>
					</div>
				)}
			</div>
			{cards ? <div className="flex gap-2 grow-0 side-scroll">{cards}</div> : null}
			{action?.text && (
				<ActionButton className="w-fit max-w-[30%]" url={action?.url} text={action.text} />
			)}
		</>
	);
}
