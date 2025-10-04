// components/home/FeaturedSection.tsx
import { SkeletonCard } from "@/components/ui/SkeletonLoader";
import { Article } from "@/types/article";
import { EmptyState } from "./EmptyState";

interface FeaturedSectionProps {
  featuredArticles: Article[];
  loading: boolean;
}

export default function FeaturedSection({ featuredArticles, loading }: FeaturedSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} type="featured" />
            ))}
          </div>
        ) : featuredArticles.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <FeaturedArticleCard 
                key={article._id} 
                article={article} 
                isMain={index === 0}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="No featured articles available" />
        )}
      </div>
    </section>
  );
}

// Sub-component for individual featured article cards
function FeaturedArticleCard({ article, isMain }: { article: Article; isMain: boolean }) {
  return (
    <div
      className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
        isMain ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Cover Image */}
      {article.coverImage ? (
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-64 md:h-80 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">No Image</span>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
        <div className="flex items-center space-x-3 mb-3 text-sm text-gray-300">
          <span className="px-2 py-0.5 rounded bg-blue-600 text-white">
            {article.category?.name || "Uncategorized"}
          </span>
          {article.author?.name && <span>By {article.author.name}</span>}
          {article.publishedAt && (
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          )}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-2 text-gray-200 text-sm line-clamp-2">
            {article.excerpt}
          </p>
        )}
      </div>
    </div>
  );
}