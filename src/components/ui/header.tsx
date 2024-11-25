import { heading } from "@/app/fonts";
import type { LucideIcon } from "lucide-react";

interface HeaderProps {
	title: string;
	level?: HeaderLevel;
	className?: string;
	Icon?: LucideIcon;
	iconClassName?: string;
}

export enum HeaderLevel {
	PAGE = 0,
	SECTION = 1,
	SUB_SECTION = 2,
}

export default function Header({
	title,
	level = HeaderLevel.PAGE,
	className = "",
	Icon,
	iconClassName,
}: HeaderProps) {
	if (level === HeaderLevel.PAGE) {
		return (
			<div className="flex items-center gap-2 my-4">
				{Icon && <Icon className={`h-12 w-12 ${iconClassName}`} />}
				<h2 className={`${heading.className} text-6xl text-primary ${className}`}>{title}</h2>
			</div>
		);
	}

	if (level === HeaderLevel.SECTION) {
		return (
			<div className="flex items-center gap-2 my-1">
				{Icon && <Icon className={`${iconClassName}`} />}
				<h3 className={`${heading.className} text-3xl text-primary ${className}`}>{title}</h3>
			</div>
		);
	}

	if (level === HeaderLevel.SUB_SECTION) {
		return (
			<div className="flex items-center gap-4 my-1">
				{Icon && <Icon className={`${iconClassName}`} />}
				<h6 className={`${heading.className} text-xl text-primary ${className}`}>{title}</h6>
			</div>
		);
	}

	return null;
}
