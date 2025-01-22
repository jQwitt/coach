import Header from "@/components/ui/header";
import { Check } from "lucide-react";

enum HIGHLIGHT {
	POPULAR = "popular",
	VALUE = "value",
	NONE = "none",
}
const coreFeatures = [
	"Access to Live Coach AI",
	"Unlimited Workout Tracking",
	"Comprehensive Analytics",
];
const tiers = [
	{
		name: "Free",
		price: "$0",
		description: "Perfect for getting started.",
		features: coreFeatures,
		highlight: HIGHLIGHT.NONE,
	},
	{
		name: "Builder",
		price: "$6",
		description: "Increased access for dedicated athletes.",
		features: [
			"Intelligent Exercise Suggestions",
			"Personalized Workout Recommendations",
			...coreFeatures,
		],
		cta: "Upgrade to Builder",
		highlight: HIGHLIGHT.POPULAR,
	},
	{
		name: "Olympian",
		price: "$10",
		description: "Unlimited access for serious fitness enthusiasts.",
		features: [
			"Individualized Workout Plans",
			"Intelligent Exercise Suggestions",
			"Personalized Workout Recommendations",
			...coreFeatures,
		],
		cta: "Upgrade to Olympian",
		highlight: HIGHLIGHT.VALUE,
	},
];

export default function ProfilePlanPage() {
	const highlights = {
		[HIGHLIGHT.POPULAR]: {
			border: "border-primary ring-2 ring-primary",
			text: "Most Popular",
		},
		[HIGHLIGHT.VALUE]: {
			border: "border-purple-500 ring-2 ring-purple-500",
			text: "Best Value",
		},
		[HIGHLIGHT.NONE]: { border: "border-gray-200", text: "" },
	};

	return (
		<div className="max-w-7xl sm:px-6 lg:px-8">
			<div className="min-w-full text-center sticky top-10 pt-10 pb-2 z-10 bg-white shadow-lg -mx-12 px-12 lg:relative lg:z-0 lg:shadow-none lg:mx-0 lg:px-0">
				<Header title="Choose Your Plan" />
				<p className="text-primary mt-4 text-sm text-left mb-2">
					Select the perfect tier to suit your needs and take your training to the next level.
				</p>
			</div>
			<div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
				{tiers.map((tier) => (
					<div
						key={tier.name}
						className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${highlights[tier.highlight].border}`}
					>
						<div className="flex-1">
							<h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
							{highlights[tier.highlight].text.length ? (
								<p
									className={`absolute top-0 py-1.5 px-4 ${tier.highlight === HIGHLIGHT.VALUE ? "bg-purple-500" : "bg-primary"} text-primary-foreground rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2`}
								>
									{highlights[tier.highlight].text}
								</p>
							) : (
								""
							)}
							<p className="mt-4 flex items-baseline text-gray-900">
								<span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
								<span className="ml-1 text-xl font-semibold">/month</span>
							</p>
							<p className="mt-6 text-gray-500">{tier.description}</p>

							<ul className="mt-6 space-y-2">
								{tier.features.map((feature) => (
									<li key={feature} className="flex items-center">
										<Check className="flex-shrink-0 text-green-500" size={16} aria-hidden="true" />
										<span className="ml-2 text-gray-500 text-xs">{feature}</span>
									</li>
								))}
							</ul>
						</div>

						{/* <Button
								variant={tier.highlight !== HIGHLIGHT.NONE ? "default" : "outline"}
								className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
							>
								{tier.cta}
							</Button> */}
					</div>
				))}
			</div>
		</div>
	);
}
