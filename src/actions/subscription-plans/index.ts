import {
	createLiveCoachConversationForUser,
	isLiveCoachConversationLimitExceeded,
} from "@/db/subscription-plans";
import { getCurrentUser } from "../user";

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
