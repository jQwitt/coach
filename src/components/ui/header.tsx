import { heading } from "@/app/fonts";

export enum HeaderLevel {
	PAGE = 0,
	SECTION = 1,
	SUB_SECTION = 2,
}

export default function Header({
	title,
	level = HeaderLevel.PAGE,
	className = "",
}: {
	title: string;
	level?: HeaderLevel;
	className?: string;
}) {
	if (level === HeaderLevel.PAGE) {
		return (
			<h2 className={`${heading.className} m-4 text-6xl text-primary ${className}`}>{title}</h2>
		);
	}

	if (level === HeaderLevel.SECTION) {
		return (
			<h3 className={`${heading.className} my-1 text-3xl text-primary ${className}`}>{title}</h3>
		);
	}

	if (level === HeaderLevel.SUB_SECTION) {
		return (
			<h6 className={`${heading.className} my-1 text-xl text-primary ${className}`}>{title}</h6>
		);
	}

	return null;
}
