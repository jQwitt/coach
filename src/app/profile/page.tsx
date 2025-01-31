import { getUserProfile } from "@/app/actions";
import UserControls from "@/components/blocks/user-controls";
import ActionButton from "@/components/ui/buttons/action-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { Crown, Mail } from "lucide-react";
import UserExercises from "./components/user-exercises";

export default async function Profile() {
	const { firstName, lastName, email, exercises, subscription } = (await getUserProfile()) || {
		exercises: [],
		subscription: {},
	};
	const { name: subscriptionName, dailyConversationLimit } = subscription || {};

	return (
		<div className="flex flex-col gap-4">
			<Header title="Profile" />
			<Card>
				<CardHeader>
					<Header title="Account" level={HeaderLevel.SECTION} />
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<p>
							{firstName} {lastName}
						</p>
						<div className="flex items-center gap-2">
							<Mail className="text-muted-foreground" size={16} />
							<p className="text-muted-foreground text-sm">{email}</p>
						</div>
					</div>

					<div className="space-y-2">
						<Header title="Subscription Plan" level={HeaderLevel.SUB_SECTION} />
						<div className="flex items-center gap-2 font-semibold">
							<Crown className="text-muted-foreground" size={16} />
							<p className="text-muted-foreground text-sm">{subscriptionName} Tier</p>
						</div>
						<p className="text-muted-foreground text-xs">
							Your plan allows {dailyConversationLimit} daily conversations with the live coach, as
							well as full access to date ranged analytics, workout tracking, and more!
						</p>
						<ActionButton url="/profile/plan" text="Upgrade your plan" />
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<Header title="Data" level={HeaderLevel.SECTION} />
				</CardHeader>
				<CardContent>
					<UserExercises exercises={exercises} />
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
