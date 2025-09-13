// app/(site)/layout.tsx
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Site Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-grow container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
