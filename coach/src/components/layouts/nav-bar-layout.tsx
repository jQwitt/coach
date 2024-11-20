import { Navbar } from "@/components/navbar";

export default async function NavBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen bg-background text-foreground py-20">
        {children}
      </main>
    </div>
  );
}
