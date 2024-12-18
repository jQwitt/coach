import type { TimeSpan } from "@/lib/types";
import { create } from "zustand";

interface TimeSpanState {
	timeSpan: TimeSpan;
	setTimeSpan: (timeSpan: TimeSpan) => void;
}

export const useTimeSpan = create<TimeSpanState>()((set) => ({
	timeSpan: "week",
	setTimeSpan: (timeSpan: TimeSpan) => set({ timeSpan }),
}));
