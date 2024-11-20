"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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
        <Avatar className="w-12 h-12 rounded-full border border-muted-foreground p-2">
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
