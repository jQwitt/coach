"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function Error() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="text-center space-y-8 p-8 max-w-md w-full bg-card rounded-2xl shadow-lg border border-border">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-primary">Oops!</h1>
        </div>
        <p className="text-lg text-foreground">an error occured</p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
