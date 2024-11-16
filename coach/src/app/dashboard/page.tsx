import Link from "next/link";

import { redirect } from "next/navigation";
import { getUser } from "../actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const clerkUser = await currentUser();

  if (!clerkUser?.id) {
    redirect("auth/sign-in");
  }

  const user = await getUser(clerkUser.id);

  return (
    <div>
      <h1>Welcome {user?.firstName}!</h1>
      <Link href="/log-workout/lifting">Log a workout!</Link>
    </div>
  );
}
