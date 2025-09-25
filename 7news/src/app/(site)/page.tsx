"use client";
import { useEffect, useState, useCallback } from "react";
import CategorySearchBar from "@/components/ui/CategorySearchBar";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { FeaturedNewsCard, TrendingNewsCard } from "@/components/ui/EnhancedNewsCards";
import { NewsCard } from "@/components/ui/NewsCard";
import { Article } from "@/types/article";



type FeaturedArticle = Article & {
  isFeatured: boolean;
};

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedArticle[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState({
    main: true,
    featured: true,
    trending: true
  });
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Fetch all data in parallel
  const fetchHomepageData = useCallback(async () => {
    try {
      setLoading({ main: true, featured: true, trending: true });
      
      const [articlesRes, featuredRes, trendingRes] = await Promise.all([
        fetch("/api/articles?page=1&limit=8", { cache: "no-store" }),
        fetch("/api/articles/featured?limit=3", { cache: "no-store" }),
        fetch("/api/articles/trending?limit=4", { cache: "no-store" })
      ]);

      const [articlesData, featuredData, trendingData] = await Promise.all([
        articlesRes.json(),
        featuredRes.json(),
        trendingRes.json()
      ]);

      setArticles(articlesData.articles || []);
      setFeaturedArticles(featuredData.articles || []);
      setTrendingArticles(trendingData.articles || []);
    } catch (err) {
      console.error("Failed to load homepage data:", err);
    } finally {
      setLoading({ main: false, featured: false, trending: false });
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

  // Initial load
  useEffect(() => {
    fetchHomepageData();
  }, [fetchHomepageData]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Stay Informed with{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Latest News
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover trending stories, in-depth analysis, and breaking news from trusted sources
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <CategorySearchBar
                onSearch={handleSearch}
                onCategorySelect={handleCategorySelect}
                activeCategory={activeCategory}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Featured Stories
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Curated selection of must-read articles
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-500">LIVE</span>
            </div>
          </div>

          {loading.featured ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} type="featured" />
              ))}
            </div>
          ) : featuredArticles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <FeaturedNewsCard 
                  key={article._id} 
                  article={article} 
                  priority={index === 0} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No featured articles available</p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            🔥 Trending Now
          </h2>
          
          {loading.trending ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : trendingArticles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingArticles.map((article) => (
                <TrendingNewsCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No trending articles available</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Latest News
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {articles.length} articles
              </span>
            </div>
          </div>

          {loading.main ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No articles found. Try a different search or category.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <NewsCard key={article._id} article={article} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading.main && articles.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest news delivered directly to your inbox. No spam, just quality content.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}