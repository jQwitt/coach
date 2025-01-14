"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type {
	LiveCoachConversationMessageAction,
	LiveCoachConversationMessageInfo,
	MessageDirection,
} from "@/lib/types";
import { ArrowRight, HelpCircle, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import * as React from "react";

export interface LiveCoachMessageProps {
	text: string;
	direction?: MessageDirection;
	ear?: boolean;
	className?: string;
	info?: LiveCoachConversationMessageInfo;
	action?: LiveCoachConversationMessageAction;
	id?: string;
}

export function LiveCoachMessage({
	text,
	direction = "inbound",
	action,
	ear = false,
	info = undefined,
	children,
	className,
	id,
}: LiveCoachMessageProps &
	Readonly<{
		children?: React.ReactNode;
	}>) {
	const [isClicked, setIsClicked] = React.useState(false);

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
			{action?.text && (
				<Button
					disabled={isClicked}
					className="group w-fit max-w-[30%]"
					onClick={() => {
						setIsClicked(true);
						redirect(action.url);
					}}
				>
					{action.text}
					{isClicked ? (
						<Loader2 size={16} className="animate-spin" />
					) : (
						<ArrowRight
							size={16}
							className="group-hover:translate-x-2 transition-all ease-in duration-100"
						/>
					)}
				</Button>
			)}
		</>
	);
}
