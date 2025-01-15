"use client";

import { useSearchParams } from "next/navigation";

export function getNamedSearchParams(...names: string[]) {
	const params = useSearchParams();
	const mapped: Record<string, string> = {};

	for (const name of names) {
		mapped[name] =
			params
				.get(name)
				?.trim()
				.split("")
				.filter((c) => c !== '"')
				.join("") ?? "";
	}

	return mapped;
}
