import Link from "next/link";

import getCurrentUser from "@/db";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("auth/sign-in");
  }

  const { firstName } = user;

  return (
    <div>
      <h1>Welcome {firstName}!</h1>
      <Link href="/log-workout/lifting">Log a workout!</Link>
    </div>
  );
}
