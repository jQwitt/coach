"use client";

import { createUser, isRegistered } from "@/app/actions";
import Alert from "@/components/blocks/error-alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@clerk/nextjs";
import type { ClerkAPIError } from "@clerk/types";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Barbell from "../../../../../public/images/dumbbell_black.png";

export default function SignUpPage() {
	const [emailData, setEmailData] = React.useState("");
	const [passwordData, setPasswordData] = React.useState("");
	const [firstNameData, setFirstNameData] = React.useState("");
	const [lastNameData, setLastNameData] = React.useState("");

	const [pendingVerification, setPendingVerification] = React.useState(false);
	const [verificationCode, setVerificationCode] = React.useState("");

	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");
	const [errorLink, setErrorLink] = React.useState({ text: "", link: "" });

	const { signUp, isLoaded, setActive } = useSignUp();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		setIsSubmitting(true);
		const submitTimout = setTimeout(() => {
			setIsSubmitting(false);
		}, 4000);

		if (signUp) {
			try {
				const previouslyRegistered = await isRegistered(emailData);
				if (previouslyRegistered) {
					throw new Error("This email address has already been registered.");
				}

				await signUp.create({
					emailAddress: emailData,
					password: passwordData,
				});

				await signUp.prepareEmailAddressVerification({
					strategy: "email_code",
				});

				setPendingVerification(true);
				clearTimeout(submitTimout);
				setIsSubmitting(false);
				setErrorMessage("");
			} catch (e) {
				const error = Object(e) as ClerkAPIError;
				const { message = "Something went wrong" } = error;
				setErrorMessage(message);
			}
		} else {
			console.warn("clerk: signUp is undefined");
		}

		clearTimeout(submitTimout);
		setIsSubmitting(false);
	};

	const onProcessVerify = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isLoaded) {
			return;
		}

		setIsSubmitting(true);
		const submitTimout = setTimeout(() => {
			setIsSubmitting(false);
		}, 4000);

		if (signUp) {
			try {
				const verificationResult = await signUp.attemptEmailAddressVerification({
					code: verificationCode,
				});

				if (verificationResult.status !== "complete") {
					console.log("failed to verify email address");
					console.log(verificationResult);
					console.log(signUp);
					return;
				}

				if (verificationResult.status === "complete" && signUp.createdUserId) {
					await createUser({
						authId: signUp.createdUserId,
						email: emailData,
						firstName: firstNameData,
						lastName: lastNameData,
					});

					await setActive({
						session: verificationResult.createdSessionId,
						redirectUrl: "/dashboard",
					});
				}
			} catch (e) {
				const error = Object(e) as ClerkAPIError;
				const { message = "Something went wrong" } = error;
				if (message.match(/"users_email_unique"/gi)) {
					setErrorMessage("This email address has already been registered.");
				} else {
					setErrorMessage(message);
				}
				setPendingVerification(false);
			}
		} else {
			console.warn("clerk: signUp is undefined");
		}

		clearTimeout(submitTimout);
		setIsSubmitting(false);
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader className="border-b-2">
				<CardTitle className="text-2xl flex items-center gap-2">
					<Header title="Sign Up" />
					<Image src={Barbell} alt="dumbbell logo" className="rotate-45" width={48} height={48} />
				</CardTitle>
				<CardDescription>
					{"Fill in your details below to get started on your journey."}
				</CardDescription>
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
				{pendingVerification ? (
					<form onSubmit={onProcessVerify}>
						<Label htmlFor="verificationCode">Verification Code</Label>
						<InputOTP
							maxLength={6}
							value={verificationCode}
							onChange={(value) => setVerificationCode(value)}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
						<div className="my-5">
							<Button className="w-full" type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<Loader2 className="animate-spin" />
								) : (
									<>
										{"Verify"}
										<ArrowRight
											size={16}
											className="transition-all ease-in duration-100 group-hover:translate-x-2"
										/>
									</>
								)}
							</Button>
						</div>
					</form>
				) : (
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
							<div className="my-3">
								<div className="flex gap-4">
									<div>
										<Label htmlFor="firstName">First name</Label>
										<Input
											id="firstName"
											name="firstName"
											value={firstNameData}
											onChange={(e) => setFirstNameData(e.target.value)}
										/>
									</div>
									<div>
										<Label htmlFor="lastName">Last name</Label>
										<Input
											id="lastName"
											name="lastName"
											value={lastNameData}
											onChange={(e) => setLastNameData(e.target.value)}
										/>
									</div>
								</div>
							</div>
						</div>
						<div>
							<Button
								className="w-full group"
								type="submit"
								disabled={pendingVerification || isSubmitting}
							>
								{isSubmitting ? (
									<Loader2 className="animate-spin" />
								) : (
									<>
										{"Start training!"}
										<ArrowRight
											size={16}
											className="transition-all ease-in duration-100 group-hover:translate-x-2"
										/>
									</>
								)}
							</Button>
							<div className="mt-5 flex justify-center">
								<Link href="/auth/sign-in">
									<p className="link text-xs">{"Already have an account?"}</p>
								</Link>
							</div>
						</div>
					</form>
				)}
			</CardContent>
		</Card>
	);
}
