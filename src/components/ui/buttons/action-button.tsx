"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import * as React from "react";
import { Button, type ButtonProps } from "../button";

interface ActionButtonProps extends ButtonProps {
	url?: string;
	text: string;
	isSubmitting?: boolean;
	onClick?: () => void;
}

export default function ActionButton({
	isSubmitting = false,
	url = "",
	onClick,
	text,
	className,
	...props
}: ActionButtonProps) {
	const [submitting, setSubmitting] = React.useState(isSubmitting);

	const handleClick = React.useCallback(() => {
		setSubmitting(true);
		const timeout = setTimeout(() => {
			setSubmitting(false);
		}, 1000);

		if (onClick) {
			(async () => onClick())().then(() => clearTimeout(timeout));
			return;
		}

		if (url.length) {
			clearTimeout(timeout);
			redirect(url);
		}
	}, [url, onClick]);

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
