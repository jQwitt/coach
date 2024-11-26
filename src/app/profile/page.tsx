import { getTagsForUser } from "@/actions/tags";
import { getCurrentUser } from "@/app/actions";
import UserControls from "@/components/blocks/user-controls";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import UserData from "./components/user-data";

export default async function Profile() {
	const { id, firstName, lastName, email, exerciseNames } = (await getCurrentUser()) || {};
	const tagCollections = id ? await getTagsForUser({ userId: id }) : [];

	return (
		<div className="flex flex-col gap-4">
			<Header title="Profile" />
			<Card>
				<CardHeader>
					<Header title="Account" level={HeaderLevel.SECTION} />
				</CardHeader>
				<CardContent>
					<p>
						{firstName} {lastName}
					</p>
					<p>{email}</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<Header title="Data" level={HeaderLevel.SECTION} />
				</CardHeader>
				<CardContent>
					<UserData exerciseNames={exerciseNames ?? []} tags={tagCollections} />
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<Header title="Settings" level={HeaderLevel.SECTION} />
				</CardHeader>
				<CardContent>
					<UserControls />
				</CardContent>
			</Card>
		</div>
	);
}
