"use client";

import { deleteCurrentUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header, { HeaderLevel } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { SignOutButton } from "@clerk/nextjs";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default function UserControls() {
  const [showDelete, setShowDelete] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState("");

  return (
    <div className="flex flex-col items-start gap-2">
      <Button>
        <SignOutButton />
      </Button>
      <Header title="Danger Zone" level={HeaderLevel.SUB_SECTION} />
      <Button variant="outline" onClick={() => setShowDelete(!showDelete)}>
        Delete my account
      </Button>
      {showDelete && (
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <p className="my-1 text-lg font-bold text-destructive">
                Warning!
              </p>
              <Button
                variant="ghost"
                className="w-12"
                onClick={() => setShowDelete(false)}
              >
                <X />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p>
                This will
                <span className="mx-1 font-bold">permanently</span>
                delete your account and all user data and cannot be undone!
              </p>
            </div>
            <Input
              type="text"
              placeholder="Type 'DELETE' to confirm"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
            />
            <Button
              onClick={() => {
                if (deleteConfirm === "DELETE") {
                  deleteCurrentUser();
                  redirect("/auth/sign-up");
                }
              }}
              disabled={deleteConfirm !== "DELETE"}
              variant="destructive"
              className="mt-2 w-full"
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
