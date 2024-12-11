"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";

export default function UserData({ exerciseNames }: { exerciseNames: string[] }) {
	const [isMounted, setIsMounted] = React.useState(false);
	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return <Loading />;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between items-center" suppressHydrationWarning>
				<p className="text-muted-foreground text-sm">Collected Exercise Names</p>
				<Dialog>
					<DialogTrigger asChild>
						<Button size="sm" variant="outline">
							View
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Exercise Names</DialogTitle>
						<DialogDescription>
							{exerciseNames?.map((name) => (
								<p key={name}>{name}</p>
							))}
							{exerciseNames.length === 0 ? <p>No names</p> : null}
						</DialogDescription>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

const Loading = () => {
	return (
		<div className="space-y-2">
			<div className="flex justify-between items-center min-w-full">
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-8 w-16" />
			</div>
			<div className="flex justify-between items-center min-w-full">
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-8 w-16" />
			</div>
		</div>
	);
};
