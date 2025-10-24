// app/server-sitemap.xml/route.ts
import { getServerSideSitemap } from 'next-sitemap'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Get dynamic articles and categories from your database
  // This is a placeholder - replace with actual database queries
  const articles = [
    // Example dynamic URLs - replace with real data
    { slug: 'openai-gpt-5-rumors-spark-ai-race-concerns', lastmod: '2025-10-24' },
    { slug: 'spacex-starship-successfully-reaches-orbit', lastmod: '2025-10-24' },
    { slug: 'global-climate-summit-reaches-historic-agreement', lastmod: '2025-10-24' },
    // Add more articles...
  ]

  const categories = [
    { slug: 'world', lastmod: '2025-10-24' },
    { slug: 'politics', lastmod: '2025-10-24' },
    { slug: 'business', lastmod: '2025-10-24' },
    // Add more categories...
  ]

  // Combine all dynamic URLs
  const dynamicUrls = [
    ...articles.map(article => ({
      loc: `https://hintflow.site/articles/${article.slug}`,
      lastmod: article.lastmod,
      changefreq: 'weekly' as const,
      priority: 0.8,
    })),
    ...categories.map(category => ({
      loc: `https://hintflow.site/categories/${category.slug}`,
      lastmod: category.lastmod,
      changefreq: 'daily' as const,
      priority: 0.7,
    })),
  ]

  return getServerSideSitemap(dynamicUrls)
}