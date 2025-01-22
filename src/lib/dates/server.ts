export function getDate() {
	return new Date().toISOString().split("T")[0];
}

export function getEpoch() {
	return new Date("2000").toISOString().split("T")[0];
}
