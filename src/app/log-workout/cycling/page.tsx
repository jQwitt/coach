import { Bike } from "lucide-react";

import { getCurrentUser } from "@/app/actions";
import Header from "@/components/ui/header";

export default async function LogWorkoutLifting() {
	const { id } = (await getCurrentUser()) ?? {};

	if (!id) {
		return <div>Not logged in</div>;
	}

	return (
		<div className="mx-auto max-w-4xl p-4 text-primary">
			<div className="flex items-center">
				<Bike className="-mt-1 font-bold" size={48} />
				<Header title="Cycling" />
			</div>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">Coming soon!</div>
		</div>
	);
}
