import { heading } from "@/app/fonts";
import { ChevronsUp } from "lucide-react";

interface HypertophyIndicatorProps {
	reps: number;
}

const HYPERTROPHY_RANGE = 5;
const ENDURANCE_RANGE = 13;

export default function HypertophyIndicator({ reps = 0 }: HypertophyIndicatorProps) {
	const isStrength = reps > 0 && reps < HYPERTROPHY_RANGE;
	const isHypertrophic = reps >= HYPERTROPHY_RANGE && reps < ENDURANCE_RANGE;
	const isEndurance = reps >= ENDURANCE_RANGE;
	const color = isStrength
		? "text-gray-500"
		: isHypertrophic
			? "text-green-500"
			: isEndurance
				? "text-red-500"
				: "";

	return (
		<div className="flex items-center">
			<ChevronsUp className={`-mt-3 ${color}`} size={16} strokeWidth={2} />
			<p className={`${heading.className} tracking-wider ${color}`}>
				{isStrength && "Strength"}
				{isHypertrophic && "Hypertophy"}
				{isEndurance && "Endurance"}
			</p>
		</div>
	);
}
