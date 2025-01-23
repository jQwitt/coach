"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import * as React from "react";
import { Button, type ButtonProps } from "../button";

interface SubmitButtonProps extends ButtonProps {
	url?: string;
	text: string;
	isSubmitting?: boolean;
}

export default function SubmitButton({
	isSubmitting = false,
	url = "",
	text,
	className,
	...props
}: SubmitButtonProps) {
	const [submitting, setSubmitting] = React.useState(isSubmitting);

	const handleClick = React.useCallback(() => {
		setSubmitting(true);
		const timeout = setTimeout(() => {
			setSubmitting(false);
		}, 1000);

		if (url.length) {
			clearTimeout(timeout);
			redirect(url);
		}
	}, [url]);

	return (
		<Button className={`group ${className}`} onClick={handleClick} disabled={submitting} {...props}>
			{text}
			{submitting ? (
				<Loader2 size={16} className="animate-spin" />
			) : (
				<ArrowRight
					size={16}
					className="transition-all ease-in duration-100 group-hover:translate-x-2"
				/>
			)}
		</Button>
	);
}
