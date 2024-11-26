import { getTagCollectionsById } from "@/db/tags";
import { getUserTags } from "@/db/users";

export async function getTagsForUser({ userId }: { userId: number }) {
	const user = await getUserTags({ userId });

	if (!user?.tags?.length) {
		console.log("error getting user tags!");
		return [];
	}

	const result = [];
	for (const tag of user.tags) {
		const data = await getTagCollectionsById({ id: tag });
		if (data) {
			result.push(data);
		}
	}

	return result;
}
