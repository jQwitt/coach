"use client";

import * as React from "react";

interface ObjectFilterInputs<T> {
	list: T[];
	key: keyof T;
}

interface ObjectFilterOptions {
	defaultToHidden?: boolean;
}

type ObjectFilterReturn<T> = {
	visible: boolean;
	noMatches: boolean;
	isEmpty: boolean;
	results: T[];
	filterByQuery: (query: string) => void;
	show: () => void;
	hide: () => void;
};

export const useObjectFilter = <T extends object>(
	{ list, key }: ObjectFilterInputs<T>,
	{ defaultToHidden = false }: ObjectFilterOptions = {},
): ObjectFilterReturn<T> => {
	const [hidden, setHidden] = React.useState(list.length === 0 || defaultToHidden);
	const [filteredList, setFilteredList] = React.useState<T[]>(list);

	const filterByQuery = React.useCallback(
		(query: string) => {
			const filtered = list.filter((item) => {
				if (Object.hasOwn(item, key) && typeof item[key] === "string") {
					return item[key].toLowerCase().includes(query.toLowerCase());
				}

				return false;
			});
			setFilteredList(filtered);
		},
		[list, key],
	);

	const show = React.useCallback(() => {
		setHidden(false);
	}, []);

	const hide = React.useCallback(() => {
		setHidden(true);
	}, []);

	return {
		visible: !hidden,
		noMatches: filteredList.length === 0 && list.length > 0,
		isEmpty: list.length === 0,
		results: filteredList,
		filterByQuery,
		show,
		hide,
	};
};
