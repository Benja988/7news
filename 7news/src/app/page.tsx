// app/page.tsx

"use client";
import { useEffect } from "react";
import { useHomePageData } from "@/hooks/useHomePageData";
import FeaturedSection from "@/components/ui/FeaturedSection";
import LatestArticlesSection from "@/components/ui/LatestArticlesSection";
import NewsletterSection from "@/components/ui/NewsletterSection";
import HeroSection from "@/components/ui/HeroSection";

export default function HomePage() {
  const {
    articles,
    featuredArticles,
    trendingArticles,
    loading,
    activeCategory,
    fetchHomepageData,
    handleSearch,
    handleCategorySelect,
    categories,
  } = useHomePageData();

  useEffect(() => {
    fetchHomepageData();
  }, [fetchHomepageData]);

  return (
    <>
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
    </>
  );
}
