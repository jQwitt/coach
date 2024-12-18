import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { TrendingUp } from "lucide-react";

export default function StatCard({
	title,
	count,
	increase,
	className,
}: { title: string; count: number; increase?: number } & React.ComponentProps<typeof Card>) {
	return (
		<Card className={className}>
			<CardHeader>
				<Header title={title} level={HeaderLevel.SUB_SECTION} />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-extrabold">{count}</div>
				{increase && (
					<div className="flex items-center gap-1 text-green-500 font-bold">
						<p className="text-xs">
							<span className="font-bold">{increase}</span> this week
						</p>
						<TrendingUp size={16} />
					</div>
				)}
			</CardContent>
		</Card>
	);
}
