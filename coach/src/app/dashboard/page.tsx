import Link from "next/link";

import getCurrentUser from "@/db";

export default async function Dashboard() {
  const user = await getCurrentUser();

  return (
    <div>
      <h1>Welcome {user?.firstName}!</h1>
      <Link href="/log-workout/lifting">Log a workout!</Link>
    </div>
  );
}
