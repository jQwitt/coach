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
		result.push(await getTagCollectionsById({ id: tag }));
	}

	return result;
}
