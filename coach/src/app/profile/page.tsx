"use client";

import { SignOutButton, UserProfile } from "@clerk/nextjs";
import { heading } from "../fonts";

export default function Profile() {
  return (
    <div>
      <h3 className={`${heading.className} text-6xl text-primary m-4`}>
        Profile
      </h3>
      <SignOutButton />
      <UserProfile />
    </div>
  );
}
