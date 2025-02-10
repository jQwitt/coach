import { Card, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { Dumbbell } from "lucide-react";

interface ExerciseCardProps {
	keyText?: string;
	name: string;
	description: string;
}

export const ExerciseCard = ({ keyText, name, description }: ExerciseCardProps) => {
	return (
		<Card
			key={keyText ?? name}
			className="relative inline-block min-w-[45%] min-h-[160px] overflow-hidden"
		>
			<CardHeader>
				<Header title={name} level={HeaderLevel.SUB_SECTION} />
				<div className="min-h-[36px]">
					<p className="text-xs text-muted-foreground text-wrap">{description}</p>
				</div>
			</CardHeader>
			<Dumbbell className="absolute -bottom-3 -right-4 h-20 w-20 opacity-10" />
		</Card>
	);
};
