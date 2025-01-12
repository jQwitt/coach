import Navbar from "@/components/blocks/navbar";

export default async function NavBarLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<header>
				<Navbar />
			</header>
			<main className="min-h-screen bg-background py-20 text-foreground mx-auto md:max-w-6xl scroll-mt-20 space-y-4 px-4 sm:px-6 lg:px-8">
				{children}
			</main>
		</div>
	);
}
