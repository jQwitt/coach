import { Navbar } from "@/components/blocks/navbar";

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
      <main className="min-h-screen bg-background py-20 text-foreground">
        <div className="mx-auto max-w-3xl scroll-mt-20 space-y-4 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
