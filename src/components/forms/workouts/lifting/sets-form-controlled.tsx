import { VerticalScrollWheel } from "@/components/controls/select-wheel";
import { Input } from "@/components/ui/input";
import type { ExerciseSetData } from "@/lib/types";

interface SetsFormControlledProps {
	currentSet: ExerciseSetData;
	setIndex: number;
	updateState: (setIndex: number, value: Partial<ExerciseSetData>) => void;
}

export default function SetsFormControlled({
	currentSet,
	setIndex,
	updateState,
}: SetsFormControlledProps) {
	const { count, reps, weight } = currentSet;
	const id = {
		count: `set-${setIndex}-count`,
		reps: `set-${setIndex}-reps`,
		weight: `set-${setIndex}-weight`,
	};

	const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const cast = Number(e.target.value);
		if (Number.isNaN(cast)) return;

		updateState(setIndex, { weight: cast });
	};

	return (
		<div className="grid grid-cols-4 text-center align-start max-w-[75%]">
			<div className="col-span-1">
				<label htmlFor={id.count}>Count</label>
				<VerticalScrollWheel
					id={id.count}
					defaultValue={count}
					onChange={(value) => updateState(setIndex, { count: value })}
				/>
			</div>
			<div className="col-span-1">
				<label htmlFor={id.reps}>Reps.</label>
				<VerticalScrollWheel
					id={id.reps}
					defaultValue={reps}
					onChange={(value) => updateState(setIndex, { reps: value })}
				/>
			</div>
			<div className="col-span-2">
				<label htmlFor={id.weight}>Weight</label>
				<Input
					inputMode="decimal"
					id={id.weight}
					defaultValue={weight}
					type="number"
					onChange={handleWeightChange}
				/>
			</div>
		</div>
	);
}
