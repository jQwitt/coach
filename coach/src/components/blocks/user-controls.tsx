"use client";

import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { deleteCurrentUser } from "@/app/actions";
import { Card, CardContent, CardHeader } from "../ui/card";
import { X } from "lucide-react";
import { heading } from "@/app/fonts";
import { Input } from "../ui/input";
import { redirect } from "next/navigation";
import Header, { HeaderLevel } from "../ui/header";

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
              <p className="text-lg font-bold text-destructive my-1">
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
