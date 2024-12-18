"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

export default function PageHeader() {
	return (
		<div className="fixed bottom-0 w-full -ml-4 p-4 flex gap-2 justify-between">
			<Button className="group" onClick={() => redirect("/dashboard")} variant={"secondary"}>
				<ArrowLeft
					size={16}
					className="group-hover:-translate-x-2 transition-all ease-in duration-100"
				/>
				Back
			</Button>
			<Button className="group" onClick={() => redirect("/analytics/range/")}>
				All Analytics
				<ArrowRight
					size={16}
					className="group-hover:translate-x-2 transition-all ease-in duration-100"
				/>
			</Button>
		</div>
	);
}
