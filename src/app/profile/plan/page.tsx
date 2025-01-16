import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
	{
		name: "Free",
		price: "$0",
		description: "Perfect for getting started",
		features: ["Basic features", "1 project", "100 MB storage", "Community support"],
		cta: "Get Started",
		highlighted: false,
	},
	{
		name: "Builder",
		price: "$19",
		description: "Great for serious builders",
		features: [
			"All Free features",
			"Unlimited projects",
			"1 GB storage",
			"Priority support",
			"Advanced analytics",
		],
		cta: "Upgrade to Builder",
		highlighted: true,
	},
	{
		name: "Olympian",
		price: "$49",
		description: "For power users and teams",
		features: [
			"All Builder features",
			"10 GB storage",
			"24/7 phone support",
			"Custom integrations",
			"Dedicated account manager",
		],
		cta: "Upgrade to Olympian",
		highlighted: false,
	},
];

export default function ProfilePlanPage() {
	return (
		<div className="py-12 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Choose Your Plan</h2>
					<p className="mt-4 text-xl text-gray-600">
						Select the perfect tier to suit your needs and take your projects to the next level.
					</p>
				</div>
				<div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
					{tiers.map((tier) => (
						<div
							key={tier.name}
							className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${
								tier.highlighted ? "border-primary ring-2 ring-primary" : "border-gray-200"
							}`}
						>
							<div className="flex-1">
								<h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
								{tier.highlighted && (
									<p className="absolute top-0 py-1.5 px-4 bg-primary text-primary-foreground rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
										Most popular
									</p>
								)}
								<p className="mt-4 flex items-baseline text-gray-900">
									<span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
									<span className="ml-1 text-xl font-semibold">/month</span>
								</p>
								<p className="mt-6 text-gray-500">{tier.description}</p>

								<ul className="mt-6 space-y-6">
									{tier.features.map((feature) => (
										<li key={feature} className="flex">
											<Check className="flex-shrink-0 w-6 h-6 text-green-500" aria-hidden="true" />
											<span className="ml-3 text-gray-500">{feature}</span>
										</li>
									))}
								</ul>
							</div>

							<Button
								variant={tier.highlighted ? "default" : "outline"}
								className="mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
							>
								{tier.cta}
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
