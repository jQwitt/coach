import { getPlanInfoById } from "@/db/plans";

export async function getPlanInfo({ planId }: { planId: string | null | undefined }) {
	const id = Number(planId);
	if (!planId?.length || Number.isNaN(id)) {
		return null;
	}

	const result = await getPlanInfoById(id);

	if (!result) {
		return null;
	}

	return result;
}
