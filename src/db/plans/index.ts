import { and, count, eq, gte } from "drizzle-orm";
import db from "..";
import schema from "../schema";

export async function getPlanInfoById(id: number) {
	return await db.query.plans_table.findFirst({
		where: (plans, { eq }) => eq(plans.id, id),
	});
}

export async function getPlanInfoByUserId(userId: number) {
	return await db
		.select({
			name: schema.plans_table.name,
			dailyConversationLimit: schema.plans_table.dailyConversationLimit,
		})
		.from(schema.users_table)
		.where(eq(schema.users_table.id, userId))
		.rightJoin(schema.plans_table, eq(schema.users_table.plan, schema.plans_table.id))
		.limit(1);
}

export async function createLiveCoachConversationForUser({
	id,
	data: { date, intent },
}: { id: number; data: { date: string; intent: string } }) {
	return await db.insert(schema.live_coach_conversations_table).values({
		userId: id,
		date,
		intent,
		fulfilled: true,
	});
}

export async function isLiveCoachConversationLimitExceeded(id: number, offset: string) {
	const foundConversations = await db
		.select({ count: count() })
		.from(schema.live_coach_conversations_table)
		.where(
			and(
				eq(schema.live_coach_conversations_table.userId, id),
				gte(schema.live_coach_conversations_table.date, offset),
			),
		);
	const conversationCount = foundConversations[0]?.count ?? 0;

	const foundDailyLimit = await db
		.select({ limit: schema.plans_table.dailyConversationLimit })
		.from(schema.users_table)
		.where(eq(schema.users_table.id, id))
		.rightJoin(schema.plans_table, eq(schema.users_table.plan, schema.plans_table.id));
	const limit = foundDailyLimit[0]?.limit ?? 0;

	return conversationCount >= limit;
}
