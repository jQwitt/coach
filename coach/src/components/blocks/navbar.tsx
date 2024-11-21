"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import {
  Menu,
  X,
  LayoutDashboard,
  BarChart2,
  User,
  Rocket,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import DumbellLogo from "../../../public/images/dumbbell_black.png";
import { redirect } from "next/navigation";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Live Coach", href: "/live-coach", icon: Rocket },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-background border-b z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Image
              src={DumbellLogo}
              alt="dumbbell logo"
              height={24}
              width={24}
              onClick={() => redirect("/dashboard")}
            />
          </div>
          {isDesktop && (
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition duration-150 ease-in-out"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          )}
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`${cn(
          "sm:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )} relative z-50 bg-background border-b`}
      >
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClickCapture={() => setMobileMenuOpen(false)}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:border-foreground transition duration-150 ease-in-out"
            >
              <div className="flex items-center">
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
