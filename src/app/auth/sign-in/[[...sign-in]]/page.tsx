"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import * as React from "react";

export default function SignInPage() {
	const [emailData, setEmailData] = React.useState("");
	const [passwordData, setPasswordData] = React.useState("");

	const { signIn, isLoaded, setActive } = useSignIn();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		if (signIn) {
			try {
				await signIn.create({
					identifier: emailData,
					password: passwordData,
				});

				if (signIn.createdSessionId) {
					setActive({
						session: signIn.createdSessionId,
						redirectUrl: "/dashboard",
					});
				}
			} catch (e) {
				console.error(e);
			}
		} else {
			console.warn("clerk: signUp is undefined");
		}
	};

	return (
		<Card className="h-[70vh] w-full max-w-md">
			<CardHeader className="border-b-2">
				<CardTitle className="text-2xl">
					<Header title="Sign In" />
				</CardTitle>
				<CardDescription>{"Good to see you again!"}</CardDescription>
			</CardHeader>
			<CardContent className="py-5">
				<form className="flex flex-col justify-between gap-10" onSubmit={onSubmit}>
					<div>
						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="coach.me@gmail.com"
								value={emailData}
								onChange={(e) => setEmailData(e.target.value)}
							/>
						</div>
						<div className="my-3">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								value={passwordData}
								onChange={(e) => setPasswordData(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<Button className="w-full" type="submit">
							{"Continue Training!"}
						</Button>
						<div className="mt-5 flex flex-col items-center gap-4">
							<Link href="/auth/reset-password">
								<p className="link text-xs">{"Having trouble signing in?"}</p>
							</Link>
							<Link href="/auth/sign-up">
								<p className="link text-xs">{"Don't have an account?"}</p>
							</Link>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
