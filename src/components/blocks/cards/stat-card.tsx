import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { TrendingUp } from "lucide-react";

export default function StatCard({
	title,
	count,
	highlight,
	className,
}: { title: string; count: number; highlight?: string } & React.ComponentProps<typeof Card>) {
	const isPositive = count > 0;

	return (
		<Card className={className}>
			<CardHeader>
				<Header title={title} level={HeaderLevel.SUB_SECTION} />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-extrabold">{count}</div>
				{highlight && (
					<div
						className={`flex items-center gap-1 font-bold ${isPositive ? "text-green-500" : "text-muted-foreground"}`}
					>
						<p className="text-xs font-bold">
							{isPositive ? "+" : ""}
							{highlight}
						</p>
						{isPositive ? <TrendingUp size={16} /> : null}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
