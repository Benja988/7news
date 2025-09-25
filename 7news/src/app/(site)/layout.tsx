// app/(site)/layout.tsx
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Site Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-grow w-full">
        <div className="mx-auto w-full max-w-8xl">
          {children}
        </div>
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}