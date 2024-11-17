"use client";

import * as React from "react";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <Card className="w-full max-w-md h-[70vh]">
      <CardHeader className="border-b-2">
        <CardTitle className="text-2xl">
          <h1>Sign In</h1>
        </CardTitle>
        <CardDescription>{"Good to see you again!"}</CardDescription>
      </CardHeader>
      <CardContent className="py-5">
        <form
          className="flex flex-col justify-between gap-10"
          onSubmit={onSubmit}
        >
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
            <div className="flex flex-col items-center gap-4 mt-5">
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
