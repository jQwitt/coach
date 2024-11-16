import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { base } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coach.me",
  description: "A smart fitness companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${base.className}`}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
