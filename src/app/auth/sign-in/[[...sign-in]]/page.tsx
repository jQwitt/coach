"use client";

import Alert from "@/components/blocks/error-alert";
import ActionButton from "@/components/ui/buttons/action-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import type { ClerkAPIError } from "@clerk/types";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Barbell from "../../../../../public/images/dumbbell_black.png";

export default function SignInPage() {
	const [emailData, setEmailData] = React.useState("");
	const [passwordData, setPasswordData] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");
	const [errorLink, setErrorLink] = React.useState({ text: "", link: "" });
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const submitDisabled = !emailData || !passwordData || isSubmitting;

	const { signIn, isLoaded, setActive } = useSignIn();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		setIsSubmitting(true);
		const submitTimeout = setTimeout(() => {
			setIsSubmitting(false);
		}, 2000);

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
					return;
				}
			} catch (e) {
				const error = Object(e) as ClerkAPIError;
				console.log(error.message);
				const { message = "Something went wrong" } = error;
				if (message === "Couldn't find your account.") {
					setErrorMessage("We couldnt find your account.");
					setErrorLink({ text: "Did you mean to sign up?", link: "/auth/sign-up" });
				} else {
					setErrorMessage(message);
				}
			}
		} else {
			console.warn("clerk: signUp is undefined");
		}
		clearTimeout(submitTimeout);
		setIsSubmitting(false);
	};

	return (
		<Card className=" w-full max-w-md">
			<CardHeader className="border-b-2">
				<CardTitle className="text-2xl flex items-center gap-2">
					<Header title="Sign In" />
					<Image src={Barbell} alt="dumbbell logo" className="rotate-45" width={48} height={48} />
				</CardTitle>
				<CardDescription>{"Good to see you again!"}</CardDescription>
			</CardHeader>
			<CardContent className="py-5">
				{errorMessage.length ? (
					<Alert
						message={errorMessage}
						className="mb-2"
						linkRoute={errorLink.link}
						linkText={errorLink.text}
					/>
				) : null}
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
					<div className="flex flex-col gap-2">
						<ActionButton
							className="w-full"
							type="submit"
							text="Continue training"
							disabled={submitDisabled}
							isSubmitting={isSubmitting}
						/>
						<div className="flex flex-col items-center gap-2">
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
