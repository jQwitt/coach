"use client";

import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "../button";

interface ContinueButtonProps {
	url: string;
	text: string;
}

export default function ContinueButton({ url, text }: ContinueButtonProps) {
	return (
		<Button className="group" onClick={() => url.length && redirect(url)}>
			{text}
			<ArrowRight
				size={16}
				className="transition-all ease-in duration-100 group-hover:translate-x-2"
			/>
		</Button>
	);
}
