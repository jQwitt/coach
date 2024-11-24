"use client";

import Image from "next/image";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import Barbell from "../../public/images/dumbbell_black.png";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-none">
      <Card className="shadow-md p-4 max-w-[80%]">
        <CardContent>
          <Image
            src={Barbell}
            alt="dumbbell logo"
            className="rotate-45 opacity-10 mx-auto"
            width={250}
            height={250}
          />
          <Header title="Coach.me" className="mx-0" />
          <div className="-mt-5">
            <p className="text-md ">
              Your on-demand virtual fitness assistant and workout tracker!
            </p>
          </div>
          <Button
            onClick={() => redirect("/dashboard")}
            className="mt-4 w-full focus:bg-green-400 transition-colors 2s"
          >
            Let's get started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
