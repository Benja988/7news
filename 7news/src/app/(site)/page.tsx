// app/page.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { Article } from "@/types/article";
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
    handleCategorySelect
  } = useHomePageData();

  // Initial load
  useEffect(() => {
    fetchHomepageData();
  }, [fetchHomepageData]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
      />

      {/* Featured Articles Section */}
      <FeaturedSection
        featuredArticles={featuredArticles}
        loading={loading.featured}
      />

      {/* Latest Articles Section */}
      <LatestArticlesSection
        articles={articles}
        loading={loading.main}
        hasMoreArticles={articles.length > 0}
      />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}