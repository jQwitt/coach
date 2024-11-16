import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 p-5 min-h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
