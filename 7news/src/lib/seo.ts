// lib/seo.ts
import { Metadata } from 'next';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateSEO(props: SEOProps = {}): Metadata {
  const {
    title = "HintFlow - Stay Informed",
    description = "Your trusted source for breaking news, technology insights, and in-depth analysis on global events, science, business, and culture.",
    keywords = ["news", "technology", "science", "business", "politics", "entertainment", "health", "sports"],
    image = "https://hintflow.site/logo.png",
    url = "https://hintflow.site",
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = []
  } = props;

  const metadata: Metadata = {
    title,
    description,
    keywords: [...keywords, ...tags].join(', '),
    authors: author ? [{ name: author }] : [{ name: "HintFlow Team" }],
    creator: author || "HintFlow Team",
    publisher: "HintFlow",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://hintflow.site'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'HintFlow',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@hintflow',
      site: '@hintflow',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section,
      tags,
    };
  }

  return metadata;
}

// Generate structured data for articles
export function generateArticleStructuredData(article: {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
  image: string;
  url: string;
  category?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.excerpt,
    "articleBody": article.content,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "HintFlow",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hintflow.site/logo.png"
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.modifiedAt || article.publishedAt,
    "image": article.image,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    },
    "articleSection": article.category,
    "keywords": article.tags?.join(', '),
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".article-content"]
    }
  };
}

// Generate structured data for categories
export function generateCategoryStructuredData(category: {
  name: string;
  description: string;
  url: string;
  articleCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name,
    "description": category.description,
    "url": category.url,
    "mainEntity": {
      "@type": "ItemList",
      "name": `${category.name} Articles`,
      "numberOfItems": category.articleCount || 0
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "HintFlow"
    }
  };
}