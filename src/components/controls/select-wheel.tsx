"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

interface VerticalScrollWheelProps {
	defaultValue?: number;
	min?: number;
	max?: number;
	step?: number;
	id?: string;
	onChange?: (value: number) => void;
}

export function VerticalScrollWheel({
	defaultValue = 0,
	min = 0,
	max = 100,
	step = 1,
	id,
	onChange,
}: VerticalScrollWheelProps) {
	const [value, setValue] = React.useState(defaultValue);
	const [isFocused, setIsFocused] = React.useState(false);
	const wheelRef = React.useRef<HTMLInputElement>(null);
	const isDragging = React.useRef(false);
	const startY = React.useRef(0);
	const startValue = React.useRef(0);

	React.useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging.current && wheelRef.current) {
				const deltaY = startY.current - e.clientY;
				const deltaValue = Math.round(deltaY / 2) * step;
				const newValue = Math.min(Math.max(startValue.current + deltaValue, min), max);
				if (newValue !== value) {
					setValue(newValue);
					onChange?.(newValue);
				}
			}
		};

		const handleMouseUp = () => {
			isDragging.current = false;
			setIsFocused(false);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [step, min, max, onChange, value]);

	const handleWheel = (e: React.WheelEvent) => {
		e.preventDefault();
		setValue((prev) => {
			const newValue = Math.min(Math.max(prev - Math.sign(e.deltaY) * step, min), max);
			onChange?.(newValue);
			return newValue;
		});
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging.current = true;
		startY.current = e.clientY;
		startValue.current = value;
		setIsFocused(true);
	};

	const incrementValue = () => {
		setValue((prev) => {
			const newValue = Math.min(prev + step, max);
			onChange?.(newValue);
			return newValue;
		});
	};

	const decrementValue = () => {
		setValue((prev) => {
			const newValue = Math.max(prev - step, min);
			onChange?.(newValue);
			return newValue;
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number.isNaN(Number(e.target.value))) return;

		const newValue = Math.min(Math.max(Number(e.target.value), min), max);
		setValue(newValue);
		onChange?.(newValue);
	};

	return (
		<div className="flex flex-col items-center">
			<button
				type="button"
				onClick={incrementValue}
				className="text-black hover:text-gray-700 focus:outline-none"
				aria-label="Increment"
			>
				<ChevronUp className="w-4 h-4" />
			</button>
			<input
				ref={wheelRef}
				className={`w-10 h-12 bg-white rounded-md text-center font-bold font-2xl flex items-center justify-center cursor-grab active:cursor-grabbing select-none transition-all ${
					isFocused ? "border-2 border-black" : "border-2 border-transparent"
				}`}
				onWheel={handleWheel}
				onMouseDown={handleMouseDown}
				onMouseEnter={() => setIsFocused(true)}
				onMouseLeave={() => !isDragging.current && setIsFocused(false)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				tabIndex={0}
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				onChange={handleChange}
				inputMode="numeric"
				value={value}
				id={id}
			/>
			<button
				type="button"
				onClick={decrementValue}
				className="text-black hover:text-gray-700 focus:outline-none"
				aria-label="Decrement"
			>
				<ChevronDown className="w-4 h-4" />
			</button>
		</div>
	);
}
