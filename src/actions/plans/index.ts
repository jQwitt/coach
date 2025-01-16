import { getPlanInfoById } from "@/db/plans";

export async function getPlanInfo({ planId }: { planId: number | null | undefined }) {
	const fallback = { plan: "free" };

	if (!planId || !Number.isSafeInteger(planId)) {
		return fallback;
	}

	const result = await getPlanInfoById(planId);
	if (!result) {
		return fallback;
	}

	return { plan: result.name };
}
