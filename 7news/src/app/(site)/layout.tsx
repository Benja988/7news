import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-grow w-full">
        <div className="mx-auto w-full max-w-8xl">{children}</div>
      </main>
      <Footer />
    </>
  );
}