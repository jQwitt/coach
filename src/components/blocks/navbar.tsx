"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart2, ClipboardCheck, LayoutDashboard, Menu, Rocket, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import * as React from "react";
import { useMediaQuery } from "react-responsive";
import DumbellLogo from "../../../public/images/dumbbell_black.png";

export default function Navbar() {
	const path = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
	const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });
	console.log(path);

	const navItems = [
		{ name: "Coach", href: "/live-coach", icon: Rocket, selected: path.startsWith("/live-coach") },
		{
			name: "Dashboard",
			href: "/dashboard",
			icon: LayoutDashboard,
			selected: path.startsWith("/dashboard"),
		},
		{
			name: "Workout",
			href: "/log-workout/lifting",
			icon: ClipboardCheck,
			selected: path.startsWith("/log-workout"),
		},
		{
			name: "Analytics",
			href: "/analytics",
			icon: BarChart2,
			selected: path.startsWith("/analytics"),
		},
		{ name: "Profile", href: "/profile", icon: User, selected: path.startsWith("/profile") },
	];

	return (
		<nav className="fixed left-0 top-0 z-40 w-full border-b bg-background">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 justify-between">
					<div className="flex flex-shrink-0 items-center">
						<Image
							src={DumbellLogo}
							alt="dumbbell logo"
							height={24}
							width={24}
							onClick={() => redirect("/dashboard")}
							className="rotate-45"
						/>
					</div>
					{isDesktop && (
						<div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
							{navItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-muted-foreground transition duration-150 ease-in-out hover:border-foreground hover:text-foreground ${item.selected ? "border-foreground" : ""}`}
								>
									<item.icon className="mr-2 h-4 w-4" />
									{item.name}
								</Link>
							))}
						</div>
					)}
					<div className="-mr-2 flex items-center sm:hidden">
						<Button
							variant="ghost"
							className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							<span className="sr-only">Open main menu</span>
							{mobileMenuOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</Button>
					</div>
				</div>
			</div>
			<div
				className={`${cn(
					"sm:hidden",
					mobileMenuOpen ? "block" : "hidden",
				)} relative z-50 border-b bg-background`}
			>
				<div className="space-y-1 pb-3 pt-2">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							onClickCapture={() => setMobileMenuOpen(false)}
							className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-muted-foreground transition duration-150 ease-in-out hover:border-foreground hover:bg-accent hover:text-foreground"
						>
							<div className="flex items-center">
								<item.icon className="mr-2 h-4 w-4" />
								{item.name}
							</div>
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
}
