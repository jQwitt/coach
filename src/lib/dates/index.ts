export function getDate() {
	"use client";

	return new Date().toISOString().split("T")[0];
}

export function getEpoch() {
	"use client";

	return new Date("2000").toISOString().split("T")[0];
}
