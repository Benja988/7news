// components/home/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import CategorySearchBar from "@/components/ui/CategorySearchBar";
import { NewsCard } from "@/components/ui/NewsCard";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { Article } from "@/types/article";
import { Play, Volume2, VolumeX } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  articleCount?: number;
}

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onCategorySelect: (slug: string) => void;
  activeCategory: string;
  featuredArticles: Article[];
  loading: boolean;
  categories: Category[]; // Add categories from db
}

export default function HeroSection({ 
  onSearch, 
  onCategorySelect, 
  activeCategory,
  featuredArticles,
  loading,
  categories 
}: HeroSectionProps) {
  const [randomArticle, setRandomArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Select random article and find related ones
  useEffect(() => {
    if (featuredArticles.length > 0) {
      const randomIndex = Math.floor(Math.random() * featuredArticles.length);
      const selectedArticle = featuredArticles[randomIndex];
      setRandomArticle(selectedArticle);
      
      // Find related articles (same category)
      const related = featuredArticles
        .filter(article => 
          article._id !== selectedArticle._id && 
          article.category?._id === selectedArticle.category?._id
        )
        .slice(0, 4);
      setRelatedArticles(related);
    }
  }, [featuredArticles]);

  const handleVideoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Get trending categories with article counts
  const trendingCategories = (categories ?? [])
    .map(category => ({
      ...category,
      count: category.articleCount || Math.floor(Math.random() * 30) + 10 // Fallback if no count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); 

  return (
    <section className="relative bg-white dark:bg-gray-900 py-8 lg:py-12 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Section - Categories & Search */}
          <div className="xl:col-span-1 lg:col-span-1 space-y-6">
            {/* Search Bar */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4">
                Discover News
              </h3>
              <CategorySearchBar
                onSearch={onSearch}
                onCategorySelect={onCategorySelect}
                activeCategory={activeCategory}
                compact={true}
              />
            </div>

            {/* Quick Categories */}
            {/* <div className="bg-gray-50 dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4">
                Trending Categories
              </h3>
              <div className="space-y-2 lg:space-y-3">
                {trendingCategories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => onCategorySelect(category.slug)}
                    className={`flex items-center justify-between w-full p-2 lg:p-3 rounded-lg lg:rounded-xl transition-all duration-200 ${
                      activeCategory === category.slug
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="font-medium text-sm lg:text-base">{category.name}</span>
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full min-w-[2rem] text-center">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div> */}
          </div>

          {/* Middle Section - Video */}
          <div className="xl:col-span-1 lg:col-span-1">
            <div className="bg-gray-900 rounded-xl lg:rounded-2xl overflow-hidden shadow-lg h-full">
              {/* Video Player */}
              <div className="relative aspect-[4/5] sm:aspect-[9/16] bg-black rounded-xl lg:rounded-2xl overflow-hidden">
                {/* Placeholder for video - replace with actual video source */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                  <div className="text-center text-white p-4 lg:p-6">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 lg:mb-4 mx-auto backdrop-blur-sm">
                      <Play className="w-6 h-6 lg:w-8 lg:h-8 ml-0.5 lg:ml-1" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold mb-2">Breaking News Coverage</h3>
                    <p className="text-white/70 text-xs lg:text-sm">
                      Live updates and analysis
                    </p>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 right-3 lg:right-4 flex items-center justify-between">
                  <button
                    onClick={handleVideoPlay}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-full p-2 lg:p-3"
                  >
                    {isPlaying ? (
                      <div className="w-4 h-4 lg:w-6 lg:h-6 bg-white rounded-sm"></div>
                    ) : (
                      <Play className="w-4 h-4 lg:w-6 lg:h-6 text-white ml-0.5" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors rounded-full p-2 lg:p-3"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                    )}
                  </button>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-3 lg:p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-xs lg:text-sm font-semibold text-white">LIVE</span>
                </div>
                <h3 className="text-base lg:text-lg font-bold text-white mb-2 line-clamp-1">
                  Global Summit Updates
                </h3>
                <p className="text-gray-300 text-xs lg:text-sm line-clamp-2">
                  Watch live coverage of the international climate summit with expert analysis
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Random News & Related */}
          <div className="xl:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 lg:gap-6 h-full">
              
              {/* Random Featured Article */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-blue-900/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                    Featured Story
                  </h3>
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                    TRENDING
                  </span>
                </div>

                {loading ? (
                  <SkeletonCard type="featured" />
                ) : randomArticle ? (
                  <div className="space-y-3 lg:space-y-4">
                    {/* Main Featured Article */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                      {randomArticle.coverImage ? (
                        <img
                          src={randomArticle.coverImage}
                          alt={randomArticle.title}
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 sm:h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">No Image</span>
                        </div>
                      )}
                      <div className="p-3 lg:p-4">
                        <div className="flex items-center space-x-2 mb-2 flex-wrap gap-y-1">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                            {randomArticle.category?.name || "General"}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {randomArticle.publishedAt ? new Date(randomArticle.publishedAt).toLocaleDateString() : "Recently"}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 text-sm lg:text-base">
                          {randomArticle.title}
                        </h4>
                        {randomArticle.excerpt && (
                          <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {randomArticle.excerpt}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                      <div>
                        <h4 className="text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 lg:mb-3">
                          Related in {randomArticle.category?.name || "This Category"}
                        </h4>
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 lg:gap-3">
                          {relatedArticles.map((article) => (
                            <div
                              key={article._id}
                              className="bg-white dark:bg-gray-800 rounded-lg p-2 lg:p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                              onClick={() => window.open(`/article/${article.slug}`, '_blank')}
                            >
                              {article.coverImage && (
                                <img
                                  src={article.coverImage}
                                  alt={article.title}
                                  className="w-full h-16 lg:h-20 object-cover rounded mb-2"
                                />
                              )}
                              <h5 className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">
                                {article.title}
                              </h5>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Recently"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 lg:py-8 text-gray-500 dark:text-gray-400 text-sm">
                    No featured articles available
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 lg:gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-3 lg:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">24</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Breaking</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-3 lg:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">156</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Today</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-3 lg:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400">12</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Live</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}