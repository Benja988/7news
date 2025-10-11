// hooks/useHomePageData.ts
import { useState, useCallback } from "react";
import { Article } from "@/types/article";
import { Category } from "@/types/category";

type FeaturedArticle = Article & {
  isFeatured: boolean;
};

type LoadingState = {
  main: boolean;
  featured: boolean;
  trending: boolean;
  categories: boolean;
};

export function useHomePageData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedArticle[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    main: true,
    featured: true,
    trending: true,
    categories: true
  });
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Fetch all data in parallel
  const fetchHomepageData = useCallback(async () => {
    try {
      setLoading({ main: true, featured: true, trending: true, categories: true });
      
      const [articlesRes, featuredRes, trendingRes, categoriesRes] = await Promise.all([
        fetch("/api/articles?page=1&limit=8", { cache: "no-store" }),
        fetch("/api/articles?featured=true&limit=3", { cache: "no-store" }),
        fetch("/api/articles/trending?limit=4", { cache: "no-store" }),
        fetch("/api/categories", { cache: "no-store" }),
      ]);

      const [articlesData, featuredData, trendingData, categoriesData] = await Promise.all([
        articlesRes.json(),
        featuredRes.json(),
        trendingRes.json(),
        categoriesRes.json(),
      ]);

      setArticles(articlesData.articles || []);
      setFeaturedArticles(featuredData.articles || []);
      setTrendingArticles(trendingData.articles || []);
      setCategories(categoriesData.categories || categoriesData.data || []);
    } catch (err) {
      console.error("Failed to load homepage data:", err);
    } finally {
      setLoading({ main: false, featured: false, trending: false, categories: true });
    }
  }, []);

  // Search function
  const handleSearch = useCallback(async (query: string) => {
    if (query.trim()) {
      try {
        setLoading(prev => ({ ...prev, main: true }));
        const res = await fetch(
          `/api/articles/search?q=${encodeURIComponent(query)}&page=1&limit=8`
        );
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(prev => ({ ...prev, main: false }));
      }
    } else {
      fetchHomepageData();
    }
  }, [fetchHomepageData]);

  // Category filter
  const handleCategorySelect = useCallback(async (slug: string) => {
    setActiveCategory(slug);
    if (slug) {
      try {
        setLoading(prev => ({ ...prev, main: true }));
        const res = await fetch(`/api/articles/category/${slug}?page=1&limit=8`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Category filter failed:", err);
      } finally {
        setLoading(prev => ({ ...prev, main: false }));
      }
    } else {
      fetchHomepageData();
    }
  }, [fetchHomepageData]);

  return {
    articles,
    featuredArticles,
    trendingArticles,
    categories,
    loading,
    activeCategory,
    fetchHomepageData,
    handleSearch,
    handleCategorySelect
  };
}