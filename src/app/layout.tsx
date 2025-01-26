import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { base } from "./fonts";
import "./globals.css";
import { LiveCoachController } from "@/components/controllers/live-coach-controller";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Coach.me",
	description: "A smart fitness companion.",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/images/dumbbell_black.ico",
				href: "/images/dumbbell_black.ico",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/images/dumbbell_white.ico",
				href: "/images/dumbbell_white.ico",
			},
		],
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<SpeedInsights />
			<ClerkProvider afterSignOutUrl="/auth/sign-in">
				<body className={`${base.className} bg-background`}>
					<LiveCoachController />
					{children}
					<Toaster />
				</body>
			</ClerkProvider>
		</html>
	);
}
