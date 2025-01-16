"use client";

export function getDate() {
	return new Date().toISOString().split("T")[0];
}

export function getEpoch() {
	return new Date("2000").toISOString().split("T")[0];
}

export function yesterday() {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	return yesterday.toISOString();
}
