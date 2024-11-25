"use client";

import ReactBodyHighlighter, { type IModelProps } from "react-body-highlighter";

interface BodyProps {
	size: "small" | "large";
}

const Height = {
	small: "10rem",
	large: "25rem",
} satisfies Record<string, string>;

export default function Body({ size }: BodyProps) {
	const computed = {
		style: {
			height: Height[size],
		},
	} satisfies Partial<Pick<IModelProps, "style">>;

	return (
		<div className="h-100">
			<ReactBodyHighlighter style={computed.style} />
		</div>
	);
}
