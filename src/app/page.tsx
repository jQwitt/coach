import Link from "next/link";

import { Button } from "@/components/common";

export default function Home() {
  return (
    <main className="bg-background p-6">
      <Link href="workout">
        <Button text="Start a workout" />
      </Link>
      <Link href="dashboard">
        <Button text="View your health dashboard" />
      </Link>
    </main>
  );
}
