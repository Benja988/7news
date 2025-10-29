// app/page.tsx

"use client";
import { useEffect } from "react";
import { useHomePageData } from "@/hooks/useHomePageData";
import FeaturedSection from "@/components/ui/FeaturedSection";
import LatestArticlesSection from "@/components/ui/LatestArticlesSection";
import NewsletterSection from "@/components/ui/NewsletterSection";
import HeroSection from "@/components/ui/HeroSection";
import HeaderMobile from "@/components/ui/HeaderMobile";
import HeaderDesktop from "@/components/ui/HeaderDesktop";
import Footer from "@/components/ui/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const { categories } = useHomePageData();
  const [scrolled, setScrolled] = useState(false);

  const {
    articles,
    featuredArticles,
    trendingArticles,
    loading,
    activeCategory,
    fetchHomepageData,
    handleSearch,
    handleCategorySelect,
  } = useHomePageData();

  useEffect(() => {
    fetchHomepageData();
  }, [fetchHomepageData]);

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
      <main className="flex-grow w-full pt-16 lg:pt-20">
        <div className="mx-auto w-full max-w-8xl">
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <HeroSection
              onSearch={handleSearch}
              onCategorySelect={handleCategorySelect}
              activeCategory={activeCategory}
              featuredArticles={featuredArticles}
              loading={loading.featured}
              categories={categories}
            />

            <FeaturedSection
              featuredArticles={featuredArticles}
              loading={loading.featured}
            />

            <LatestArticlesSection
              articles={articles}
              loading={loading.main}
              hasMoreArticles={articles.length > 0}
            />
          </div>

          <NewsletterSection />
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
