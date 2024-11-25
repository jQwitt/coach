"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export interface MessageProps {
  text: string;
  direction?: "inbound" | "outbound";
  ear?: boolean;
  avatarSrc?: string;
}

export function Message({
  text,
  direction = "inbound",
  ear = false,
  avatarSrc,
  children,
}: MessageProps &
  Readonly<{
    children?: React.ReactNode;
  }>) {
  return (
    <div>
      {avatarSrc && (
        <Avatar className="h-12 w-12 rounded-full border border-muted-foreground p-2">
          <AvatarImage src={avatarSrc} alt="User avatar" />
        </Avatar>
      )}
      <div className="relative inline-block max-w-md">
        <Card
          className={`${
            ear
              ? direction === "inbound"
                ? "rounded-bl-none"
                : "rounded-br-none"
              : ""
          }`}
        >
          <CardContent className="p-4">
            {text}
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
