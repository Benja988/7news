"use client";

import HeaderMobile from "@/components/ui/HeaderMobile";
import HeaderDesktop from "@/components/ui/HeaderDesktop";
import Footer from "@/components/ui/Footer";
import { useHomePageData } from "@/hooks/useHomePageData";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const { categories } = useHomePageData();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HeaderMobile user={user} scrolled={scrolled} categories={categories} />
      <HeaderDesktop user={user} scrolled={scrolled} categories={categories} />
      <main className="flex-grow w-full">
        <div className="mx-auto w-full max-w-8xl">{children}</div>
      </main>
      <Footer />
    </>
  );
}