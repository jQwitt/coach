"use client";

import type React from "react";

export interface MessageProps {
	text: string;
	direction?: "inbound" | "outbound";
	ear?: boolean;
}

export function Message({
	text,
	direction = "inbound",
	ear = false,
	children,
}: MessageProps &
	Readonly<{
		children?: React.ReactNode;
	}>) {
	return (
		<div
			className={`${
				ear ? (direction === "inbound" ? "rounded-bl-none" : "rounded-br-none") : ""
			} relative text-sm max-w-[75%] w-fit shadow-md rounded-md outline outline-1 outline-slate-300 px-3 py-1`}
		>
			{text}
			{children}
		</div>
	);
}
