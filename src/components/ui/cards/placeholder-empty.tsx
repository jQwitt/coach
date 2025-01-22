import { Card } from "../card";

interface PlaceHolderCardEmptyProps {
	text: string;
	isBanner?: boolean;
	children?: React.ReactNode;
}

export function PlaceHolderCardEmpty({
	text,
	isBanner = false,
	children,
}: PlaceHolderCardEmptyProps) {
	return (
		<Card
			className={`relative w-full min-h-[${isBanner ? "60px" : "160px"}] bg-secondary opacity-40 py-4 border-dashed border border-muted-foreground`}
		>
			<div className="min-h-full flex flex-col justify-center items-center">
				{children}
				<p className="text-xs text-muted-foreground">{text}</p>
			</div>
		</Card>
	);
}
