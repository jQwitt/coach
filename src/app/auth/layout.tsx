import type * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-5">
			{children}
		</div>
	);
}
