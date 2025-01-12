"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { LiveCoachConversationMessageInfo, MessageDirection } from "@/lib/types";
import { HelpCircle } from "lucide-react";
import type React from "react";

export interface MessageProps {
	text: string;
	direction?: MessageDirection;
	ear?: boolean;
	className?: string;
	info?: LiveCoachConversationMessageInfo;
}

export function Message({
	text,
	direction = "inbound",
	ear = false,
	info = undefined,
	children,
	className,
}: MessageProps &
	Readonly<{
		children?: React.ReactNode;
	}>) {
	return (
		<div
			className={`${ear ? (direction === "inbound" ? "rounded-bl-none " : "rounded-br-none ") : ""} ${direction === "inbound" ? "self-start " : "self-end bg-black text-white"} relative text-sm max-w-[75%] w-fit shadow-md rounded-md outline outline-1 outline-slate-300 px-3 py-2 ${className}`}
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
	);
}
