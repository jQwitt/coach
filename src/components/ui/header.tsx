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
	children,
}: HeaderProps & { children?: React.ReactNode }) {
	const outer = "flex items-end gap-2 w-full";
	const inner = `${heading.className} text-primary whitespace-nowrap truncate text-ellipsis ${className}`;

	if (level === HeaderLevel.PAGE) {
		return (
			<div className={`${outer} my-4`}>
				{Icon && <Icon className={`h-12 w-12 ${iconClassName}`} />}
				<h2 className={`${inner} text-6xl`}>{title}</h2>
				{children}
			</div>
		);
	}

	if (level === HeaderLevel.SECTION) {
		return (
			<div className={`${outer} my-1`}>
				{Icon && <Icon className={`${iconClassName}`} />}
				<h3 className={`${inner} text-3xl`}>{title}</h3>
				{children}
			</div>
		);
	}

	if (level === HeaderLevel.SUB_SECTION) {
		return (
			<div className={`${outer} gap-4 my-1`}>
				{Icon && <Icon className={`${iconClassName}`} />}
				<h6 className={`${inner} text-xl`}>{title}</h6>
				{children}
			</div>
		);
	}

	return null;
}
