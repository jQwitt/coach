import db from "..";

export const getTagCollectionsById = async ({ id }: { id: number }) => {
	const result = await db.query.user_tags.findFirst({
		where: (tag, { eq }) => eq(tag.id, id),
	});

	if (!result) {
		console.log("error getting tag collection!");
		return null;
	}

	return result;
};
