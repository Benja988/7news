// components/ui/HeroSection.tsx
"use client";

import { useState, useEffect, useCallback, memo } from "react";
import CategorySearchBar from "@/components/ui/CategorySearchBar";
import { NewsCard } from "@/components/ui/NewsCard";
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { Article } from "@/types/article";
import { Play, Volume2, VolumeX, Pause, Fullscreen, ExternalLink } from "lucide-react";

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
  categories: Category[]; 
}

// Custom hook for video player state management
const useVideoPlayer = (initialState = { isPlaying: false, isMuted: true }) => {
  const [videoState, setVideoState] = useState(initialState);
  
  const togglePlay = useCallback(() => {
    setVideoState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);
  
  const toggleMute = useCallback(() => {
    setVideoState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);
  
  const play = useCallback(() => {
    setVideoState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setVideoState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  return {
    ...videoState,
    togglePlay,
    toggleMute,
    play,
    pause
  };
};

// Video Player Component
interface VideoPlayerProps {
  title: string;
  description: string;
  isLive?: boolean;
  viewerCount?: number;
  channel?: string;
  duration?: string;
}

const VideoPlayer = memo(({ 
  title, 
  description, 
  isLive = true, 
  viewerCount = 2500,
  channel = "CNN International",
  duration = "15 min ago"
}: VideoPlayerProps) => {
  const { isPlaying, isMuted, togglePlay, toggleMute } = useVideoPlayer();

  return (
    <div className="bg-gray-900 rounded-xl lg:rounded-2xl overflow-hidden shadow-lg h-full group hover:shadow-xl transition-all duration-300">
      {/* Video Container */}
      <div className="relative aspect-[9/16] sm:aspect-[4/5] bg-black rounded-xl lg:rounded-2xl overflow-hidden">
        
        {/* Actual Video Element - Replace with your video source */}
        <video
          className={`absolute inset-0 w-full h-full object-cover ${isPlaying ? 'opacity-100' : 'opacity-90'}`}
          poster="/video-poster.jpg"
          onClick={togglePlay}
          muted={isMuted}
        >
          <source src="/news-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-indigo-900/80 flex items-center justify-center cursor-pointer transition-all duration-300"
            onClick={togglePlay}
          >
            <div className="text-center text-white p-4 lg:p-6 transform group-hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 lg:mb-4 mx-auto backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/30">
                <Play className="w-6 h-6 lg:w-8 lg:h-8 ml-0.5 lg:ml-1" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold mb-2">Breaking News Coverage</h3>
              <p className="text-white/70 text-xs lg:text-sm">
                Click to play live updates
              </p>
            </div>
          </div>
        )}
        
        {/* Enhanced Video Controls */}
        <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 right-3 lg:right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-2">
            <ControlButton
              onClick={togglePlay}
              icon={isPlaying ? 
                <Pause className="w-3 h-3 lg:w-4 lg:h-4" /> : 
                <Play className="w-3 h-3 lg:w-4 lg:h-4 ml-0.5" />
              }
              label={isPlaying ? "Pause" : "Play"}
            />
            
            <ControlButton
              onClick={toggleMute}
              icon={isMuted ? 
                <VolumeX className="w-3 h-3 lg:w-4 lg:h-4" /> : 
                <Volume2 className="w-3 h-3 lg:w-4 lg:h-4" />
              }
              label={isMuted ? "Unmute" : "Mute"}
            />
            
            {isLive && (
              <div className="flex items-center space-x-1 bg-red-600 px-2 py-1 rounded-md">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-white">LIVE</span>
              </div>
            )}
          </div>
          
          <ControlButton
            onClick={() => {/* Handle fullscreen */}}
            icon={<Fullscreen className="w-3 h-3 lg:w-4 lg:h-4" />}
            label="Fullscreen"
          />
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600/50">
          <div className="h-full bg-red-600 w-1/3 transition-all duration-1000"></div>
        </div>

        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-3 lg:top-4 left-3 lg:left-4">
            <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-white">LIVE</span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Video Info */}
      <div className="p-3 lg:p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {isLive && (
              <>
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-xs lg:text-sm font-semibold text-white">LIVE NOW</span>
              </>
            )}
          </div>
          <span className="text-xs text-gray-400">{viewerCount.toLocaleString()} watching</span>
        </div>
        
        <h3 className="text-base lg:text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-200 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 text-xs lg:text-sm line-clamp-2 mb-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="font-medium">{channel}</span>
          <span>Started {duration}</span>
        </div>
      </div>
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

// Reusable control button component
const ControlButton = ({ onClick, icon, label }: { 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all rounded-full p-2 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-110"
  >
    {icon}
  </button>
);

// Related Article Card Component
const RelatedArticleCard = memo(({ article, onClick }: { 
  article: Article; 
  onClick: () => void;
}) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-lg p-2 lg:p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
    onClick={onClick}
  >
    {article.coverImage && (
      <div className="relative overflow-hidden rounded mb-2">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-16 lg:h-20 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
    )}
    <h5 className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      {article.title}
    </h5>
    <div className="flex items-center justify-between mt-2">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Recently"}
      </p>
      <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
));

RelatedArticleCard.displayName = 'RelatedArticleCard';

// Quick Stats Component
const QuickStats = memo(({ categories }: { categories: Category[] }) => {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalCategories: 0,
    publishedToday: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total articles count
        const articlesRes = await fetch('/api/articles?limit=1');
        const articlesData = await articlesRes.json();
        const totalArticles = articlesData.total || 0;

        // Fetch published articles today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const publishedTodayRes = await fetch(`/api/articles?publishedAfter=${today.toISOString()}&limit=1`);
        const publishedTodayData = await publishedTodayRes.json();
        const publishedToday = publishedTodayData.total || 0;

        setStats({
          totalArticles,
          totalCategories: categories.length,
          publishedToday
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Fallback to static data if API fails
        setStats({
          totalArticles: categories.reduce((sum, cat) => sum + (cat.articleCount || 0), 0),
          totalCategories: categories.length,
          publishedToday: 0
        });
      }
    };

    if (categories.length > 0) {
      fetchStats();
    }
  }, [categories]);

  const statItems = [
    { value: stats.totalArticles.toString(), label: "Articles", color: "text-blue-600 dark:text-blue-400" },
    { value: stats.totalCategories.toString(), label: "Categories", color: "text-green-600 dark:text-green-400" },
    { value: stats.publishedToday.toString(), label: "Today", color: "text-orange-600 dark:text-orange-400" }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 lg:gap-4">
      {statItems.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-3 lg:p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 group border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
        >
          <div className={`text-xl lg:text-2xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
            {stat.value}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
});

QuickStats.displayName = 'QuickStats';

// Main HeroSection Component
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

  // Select random article and find related ones
  useEffect(() => {
    if (featuredArticles.length > 0) {
      const randomIndex = Math.floor(Math.random() * featuredArticles.length);
      const selectedArticle = featuredArticles[randomIndex];
      setRandomArticle(selectedArticle);
      
      const related = featuredArticles
        .filter(article => 
          article._id !== selectedArticle._id && 
          article.category?._id === selectedArticle.category?._id
        )
        .slice(0, 4);
      setRelatedArticles(related);
    }
  }, [featuredArticles]);

  const handleArticleClick = (slug: string) => {
    window.open(`/article/${slug}`, '_blank');
  };

  // Get trending categories with article counts
  const trendingCategories = (categories ?? [])
    .map(category => ({
      ...category,
      count: category.articleCount || Math.floor(Math.random() * 30) + 10
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
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
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
          </div>

          {/* Middle Section - Video */}
          <div className="xl:col-span-1 lg:col-span-1">
            <VideoPlayer
              title="Global Summit Updates"
              description="Watch live coverage of the international climate summit with expert analysis and real-time updates from our correspondents."
              isLive={true}
              viewerCount={2500}
              channel="Video Channel"
              duration="15 min ago"
            />
          </div>

          {/* Right Section - Random News & Related */}
          <div className="xl:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 lg:gap-6 h-full">
              
              {/* Random Featured Article */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-blue-900/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                    Featured Story
                  </h3>
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium animate-pulse">
                    TRENDING
                  </span>
                </div>

                {loading ? (
                  <SkeletonCard type="featured" />
                ) : randomArticle ? (
                  <div className="space-y-3 lg:space-y-4">
                    {/* Main Featured Article */}
                    <div 
                      className="bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group border border-gray-100 dark:border-gray-700"
                      onClick={() => handleArticleClick(randomArticle.slug)}
                    >
                      {randomArticle.coverImage ? (
                        <div className="relative overflow-hidden">
                          <img
                            src={randomArticle.coverImage}
                            alt={randomArticle.title}
                            className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                      ) : (
                        <div className="w-full h-40 sm:h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors">
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
                        <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 text-sm lg:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                        <h4 className="text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 lg:mb-3 flex items-center">
                          Related in {randomArticle.category?.name || "This Category"}
                          <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                            {relatedArticles.length}
                          </span>
                        </h4>
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 lg:gap-3">
                          {relatedArticles.map((article) => (
                            <RelatedArticleCard
                              key={article._id}
                              article={article}
                              onClick={() => handleArticleClick(article.slug)}
                            />
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
              <QuickStats categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}