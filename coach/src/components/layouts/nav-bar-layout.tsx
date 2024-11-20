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
        <div className="space-y-4 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          {children}
        </div>
      </main>
    </div>
  );
}
