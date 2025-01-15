import db from "..";

export async function getPlanInfoById(id: number) {
	return await db.query.plans_table.findFirst({
		where: (plans, { eq }) => eq(plans.id, id),
	});
}
