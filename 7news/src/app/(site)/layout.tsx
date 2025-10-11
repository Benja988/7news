// app/(site)/layout.tsx
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
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