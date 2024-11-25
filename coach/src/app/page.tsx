"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/ui/header";
import Image from "next/image";
import { redirect } from "next/navigation";
import Barbell from "../../public/images/dumbbell_black.png";

export default function Home() {
	return (
		<div className="overflow-none flex min-h-screen flex-col items-center justify-center">
			<Card className="max-w-[80%] p-4 shadow-md">
				<CardContent>
					<Image
						src={Barbell}
						alt="dumbbell logo"
						className="mx-auto rotate-45 opacity-10"
						width={250}
						height={250}
					/>
					<Header title="Coach.me" className="mx-0" />
					<div className="-mt-5">
						<p className="text-md">Your on-demand virtual fitness assistant and workout tracker!</p>
					</div>
					<Button
						onClick={() => redirect("/dashboard")}
						className="2s mt-4 w-full transition-colors focus:bg-green-400"
					>
						{"Let's get started"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
