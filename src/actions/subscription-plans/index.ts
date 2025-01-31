import {
	createLiveCoachConversationForUser,
	getSubscriptionPlanById,
	getSubscriptionPlanByUserId,
	isLiveCoachConversationLimitExceeded,
} from "@/db/subscription-plans";
import { getCurrentUser } from "../user";

export async function getSubscriptionPlan({ planId }: { planId: number | null | undefined }) {
	const fallback = { subscriptionPlan: "free", dailyConversationLimit: 1 };

	if (!planId || !Number.isSafeInteger(planId)) {
		return fallback;
	}

	const result = await getSubscriptionPlanById(planId);
	if (!result) {
		return fallback;
	}

	const { name, dailyConversationLimit } = result;
	return { subscriptionPlan: name, dailyConversationLimit };
}

export async function getSubscriptionPlanForCurrentUser() {
	const { id } = (await getCurrentUser()) || {};

	if (!id) {
		return null;
	}

	const result = await getSubscriptionPlanByUserId(id);
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
