"use client";

import type { MessageDirection } from "@/lib/types";
import type React from "react";

export interface MessageProps {
	text: string;
	direction?: MessageDirection;
	ear?: boolean;
	className?: string;
}

export function Message({
	text,
	direction = "inbound",
	ear = false,
	children,
	className,
}: MessageProps &
	Readonly<{
		children?: React.ReactNode;
	}>) {
	return (
		<div
			className={`${ear ? (direction === "inbound" ? "rounded-bl-none " : "rounded-br-none ") : ""} ${direction === "inbound" ? "self-start " : "self-end bg-black text-white"} relative text-sm max-w-[75%] w-fit shadow-md rounded-md outline outline-1 outline-slate-300 px-3 py-1 ${className}`}
		>
			{text}
			{children}
		</div>
	);
}
