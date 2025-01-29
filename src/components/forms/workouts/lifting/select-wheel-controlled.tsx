"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

interface VerticalScrollWheelProps {
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	id?: string;
	onChange: (value: number) => void;
	className?: string;
	inputMode?: "numeric" | "decimal";
}

export function VerticalScrollWheelControlled({
	value = 0,
	min = 0,
	max = 100,
	step = 1,
	id,
	onChange,
	className = "",
	inputMode = "numeric",
}: VerticalScrollWheelProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number.isNaN(Number(e.target.value))) return;

		const newValue = Math.min(Math.max(Number(e.target.value), min), max);

		onChange(newValue);
	};

	return (
		<div className={`flex flex-col items-center w-12 ${className}`}>
			<button
				type="button"
				onClick={() => onChange(value + step)}
				className="text-black hover:text-gray-700 focus:outline-none"
				aria-label="Increment"
			>
				<ChevronUp className="w-4 h-4" />
			</button>
			<input
				className="w-full h-12 bg-white rounded-md text-center font-bold font-2xl flex items-center justify-center cursor-grab active:cursor-grabbing select-none transition-all border-2 border-transparent hover:border-black focus:border-black"
				tabIndex={0}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				onChange={handleChange}
				inputMode={inputMode}
				value={value}
				id={id}
			/>
			<button
				type="button"
				onClick={() => onChange(value - step)}
				className="text-black hover:text-gray-700 focus:outline-none"
				aria-label="Decrement"
			>
				<ChevronDown className="w-4 h-4" />
			</button>
		</div>
	);
}
