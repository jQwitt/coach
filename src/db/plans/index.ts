import db from "..";
import schema from "../schema";

export async function getPlanInfoById(id: number) {
	return await db.query.plans_table.findFirst({
		where: (plans, { eq }) => eq(plans.id, id),
	});
}

export async function createLiveCoachConversationForUser({
	id,
	data: { date, intent },
}: { id: number; data: { date: string; intent: string } }) {
	return await db.insert(schema.users_conversation_table).values({
		userId: id,
		date,
		intent,
		fulfilled: true,
	});
}
