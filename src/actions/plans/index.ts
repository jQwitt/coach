import {
	createLiveCoachConversationForUser,
	getPlanInfoById,
	getPlanInfoByUserId,
	isLiveCoachConversationLimitExceeded,
} from "@/db/plans";
import { getCurrentUser } from "../user";

export async function getPlanInfo({ planId }: { planId: number | null | undefined }) {
	const fallback = { plan: "free", dailyConversationLimit: 1 };

	if (!planId || !Number.isSafeInteger(planId)) {
		return fallback;
	}

	const result = await getPlanInfoById(planId);
	if (!result) {
		return fallback;
	}

	const { name, dailyConversationLimit } = result;
	return { plan: name, dailyConversationLimit };
}

export async function getPlanInfoForCurrentUser() {
	const { id } = (await getCurrentUser()) || {};

	if (!id) {
		return null;
	}

	const result = await getPlanInfoByUserId(id);
	if (!result?.length) {
		return null;
	}

	return result[0];
}

export async function logConversation({ date, intent }: { date: string; intent: string }) {
	const { id } = (await getCurrentUser()) || {};

	if (!id) {
		return;
	}

	await createLiveCoachConversationForUser({ id, data: { date, intent } });
}

export async function isConversationLimitReached(offset: string) {
	const { id } = (await getCurrentUser()) || {};

	if (!id) {
		return null;
	}

	return await isLiveCoachConversationLimitExceeded(id, offset);
}
