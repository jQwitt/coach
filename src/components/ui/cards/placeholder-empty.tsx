import { Card } from "../card";

interface PlaceHolderCardEmptyProps {
	text: string;
	height?: "60px" | "120px" | "160px";
	children?: React.ReactNode;
}

export function PlaceHolderCardEmpty({
	text,
	height = "160px",
	children,
}: PlaceHolderCardEmptyProps) {
	return (
		<Card
			className={`relative w-full min-h-[${height}] bg-secondary opacity-40 py-4 border-dashed border border-muted-foreground flex flex-col justify-center items-center`}
		>
			<div className="min-h-full flex flex-col justify-center items-center">
				{children}
				<p className="text-xs text-muted-foreground">{text}</p>
			</div>
		</Card>
	);
}
