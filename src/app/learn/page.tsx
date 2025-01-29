import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { Brain } from "lucide-react";
import { heading } from "../fonts";
import { DetermineOneRepMax } from "./components/actions";

export default async function LearnPage() {
	return (
		<>
			<Header title="Learn" level={HeaderLevel.PAGE} Icon={Brain} />
			<br />
			<Card>
				<CardHeader>
					<Header title="Hypertrophy" level={HeaderLevel.SECTION} />
				</CardHeader>
				<CardContent className="space-y-2">
					<p>
						When exercising, the number of repetitions performed directly influences the nature of
						muscle growth.
					</p>
					<p>
						There is an optimal number of repitions to promote
						<span className={`${heading.className} tracking-widest mx-1`}>Hypertrophy</span>-
						muscular growth targeting size.
					</p>
					<p>
						Less repetitions typically promote
						<span className={`${heading.className} tracking-widest mx-1`}>Strength.</span>
					</p>
					<p>
						More repetitions typically promote
						<span className={`${heading.className} tracking-widest mx-1`}>Endurance.</span>
					</p>
					<DetermineOneRepMax />
				</CardContent>
			</Card>
		</>
	);
}
