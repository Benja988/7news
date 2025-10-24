import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../lib/models/Category.js";
import Article from "../lib/models/Article.js";

// Load .env variables
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const categoryData = [
  // Parent categories
  { name: "World", slug: "world", description: "Global news and international affairs" },
  { name: "Politics", slug: "politics", description: "Political news and government affairs" },
  { name: "Business", slug: "business", description: "Business, finance, and economic news" },
  { name: "Technology", slug: "technology", description: "Technology, innovation, and digital news" },
  { name: "Sports", slug: "sports", description: "Sports news and athletic events" },
  { name: "Entertainment", slug: "entertainment", description: "Movies, music, TV, and celebrity news" },
  { name: "Health", slug: "health", description: "Health, fitness, and medical news" },
  { name: "Science", slug: "science", description: "Scientific discoveries and research" },
  { name: "Education", slug: "education", description: "Education, schools, and learning" },
  { name: "Environment", slug: "environment", description: "Environmental news and climate issues" },
  { name: "Opinion / Editorial", slug: "opinion-editorial", description: "Editorials, commentary, and analysis" },
  { name: "Travel", slug: "travel", description: "Travel destinations and tips" },
  { name: "Lifestyle", slug: "lifestyle", description: "Lifestyle, relationships, and culture" },
  { name: "Crime & Security", slug: "crime-security", description: "Crime, law enforcement, and public safety" },
  { name: "Religion & Faith", slug: "religion-faith", description: "Religious news and faith communities" },
  { name: "Local / Regional", slug: "local-regional", description: "Local news and community events" },
  { name: "Breaking News", slug: "breaking-news", description: "Urgent and breaking news stories" },
  { name: "Opinion Polls & Analysis", slug: "opinion-polls-analysis", description: "Surveys, predictions, and data journalism" },
  { name: "Culture", slug: "culture", description: "Arts, literature, heritage, and photography" },
  { name: "Autos & Transport", slug: "autos-transport", description: "Automotive and transportation news" },
];

const subcategoryData = [
  // World subcategories
  { name: "Africa", slug: "africa", parentSlug: "world" },
  { name: "Asia", slug: "asia", parentSlug: "world" },
  { name: "Europe", slug: "europe", parentSlug: "world" },
  { name: "Middle East", slug: "middle-east", parentSlug: "world" },
  { name: "North America", slug: "north-america", parentSlug: "world" },
  { name: "South America", slug: "south-america", parentSlug: "world" },
  { name: "Oceania", slug: "oceania", parentSlug: "world" },
  { name: "Global Politics", slug: "global-politics", parentSlug: "world" },
  { name: "Diplomacy", slug: "diplomacy", parentSlug: "world" },

  // Politics subcategories
  { name: "National Politics", slug: "national-politics", parentSlug: "politics" },
  { name: "Elections", slug: "elections", parentSlug: "politics" },
  { name: "Government & Policy", slug: "government-policy", parentSlug: "politics" },
  { name: "Political Analysis", slug: "political-analysis", parentSlug: "politics" },
  { name: "Corruption & Accountability", slug: "corruption-accountability", parentSlug: "politics" },

  // Business subcategories
  { name: "Economy", slug: "economy", parentSlug: "business" },
  { name: "Markets", slug: "markets", parentSlug: "business" },
  { name: "Startups", slug: "startups", parentSlug: "business" },
  { name: "Entrepreneurship", slug: "entrepreneurship", parentSlug: "business" },
  { name: "Real Estate", slug: "real-estate", parentSlug: "business" },
  { name: "Personal Finance", slug: "personal-finance", parentSlug: "business" },
  { name: "Banking & Investment", slug: "banking-investment", parentSlug: "business" },

  // Technology subcategories
  { name: "Artificial Intelligence (AI)", slug: "artificial-intelligence-ai", parentSlug: "technology" },
  { name: "Gadgets & Devices", slug: "gadgets-devices", parentSlug: "technology" },
  { name: "Software & Apps", slug: "software-apps", parentSlug: "technology" },
  { name: "Cybersecurity", slug: "cybersecurity", parentSlug: "technology" },
  { name: "Tech Industry", slug: "tech-industry", parentSlug: "technology" },
  { name: "Science & Innovation", slug: "science-innovation", parentSlug: "technology" },
  { name: "Internet & Social Media", slug: "internet-social-media", parentSlug: "technology" },

  // Sports subcategories
  { name: "Football (Soccer)", slug: "football-soccer", parentSlug: "sports" },
  { name: "Basketball", slug: "basketball", parentSlug: "sports" },
  { name: "Athletics", slug: "athletics", parentSlug: "sports" },
  { name: "Tennis", slug: "tennis", parentSlug: "sports" },
  { name: "Rugby", slug: "rugby", parentSlug: "sports" },
  { name: "eSports", slug: "esports", parentSlug: "sports" },
  { name: "Sports Analysis", slug: "sports-analysis", parentSlug: "sports" },

  // Entertainment subcategories
  { name: "Movies", slug: "movies", parentSlug: "entertainment" },
  { name: "Music", slug: "music", parentSlug: "entertainment" },
  { name: "TV & Streaming", slug: "tv-streaming", parentSlug: "entertainment" },
  { name: "Celebrities", slug: "celebrities", parentSlug: "entertainment" },
  { name: "Culture & Lifestyle", slug: "culture-lifestyle", parentSlug: "entertainment" },
  { name: "Fashion", slug: "fashion", parentSlug: "entertainment" },

  // Health subcategories
  { name: "Fitness & Wellness", slug: "fitness-wellness", parentSlug: "health" },
  { name: "Nutrition", slug: "nutrition", parentSlug: "health" },
  { name: "Mental Health", slug: "mental-health", parentSlug: "health" },
  { name: "Medicine & Research", slug: "medicine-research", parentSlug: "health" },
  { name: "Public Health", slug: "public-health", parentSlug: "health" },

  // Science subcategories
  { name: "Space", slug: "space", parentSlug: "science" },
  { name: "Environment", slug: "science-environment", parentSlug: "science" },
  { name: "Discoveries", slug: "discoveries", parentSlug: "science" },
  { name: "Research & Development", slug: "research-development", parentSlug: "science" },
  { name: "Climate Change", slug: "science-climate-change", parentSlug: "science" },

  // Education subcategories
  { name: "Schools & Universities", slug: "schools-universities", parentSlug: "education" },
  { name: "Learning & Skills", slug: "learning-skills", parentSlug: "education" },
  { name: "Research & Innovation", slug: "education-research-innovation", parentSlug: "education" },
  { name: "Student Life", slug: "student-life", parentSlug: "education" },

  // Environment subcategories
  { name: "Climate Change", slug: "environment-climate-change", parentSlug: "environment" },
  { name: "Wildlife & Nature", slug: "wildlife-nature", parentSlug: "environment" },
  { name: "Sustainability", slug: "sustainability", parentSlug: "environment" },
  { name: "Energy & Resources", slug: "energy-resources", parentSlug: "environment" },

  // Opinion / Editorial subcategories
  { name: "Editorials", slug: "editorials", parentSlug: "opinion-editorial" },
  { name: "Commentary", slug: "commentary", parentSlug: "opinion-editorial" },
  { name: "Analysis", slug: "analysis", parentSlug: "opinion-editorial" },
  { name: "Letters to the Editor", slug: "letters-editor", parentSlug: "opinion-editorial" },

  // Travel subcategories
  { name: "Destinations", slug: "destinations", parentSlug: "travel" },
  { name: "Culture", slug: "travel-culture", parentSlug: "travel" },
  { name: "Adventure", slug: "adventure", parentSlug: "travel" },
  { name: "Travel Tips", slug: "travel-tips", parentSlug: "travel" },

  // Lifestyle subcategories
  { name: "Relationships", slug: "relationships", parentSlug: "lifestyle" },
  { name: "Food & Drink", slug: "food-drink", parentSlug: "lifestyle" },
  { name: "Home & Design", slug: "home-design", parentSlug: "lifestyle" },
  { name: "Fashion & Beauty", slug: "fashion-beauty", parentSlug: "lifestyle" },
  { name: "Culture & Arts", slug: "culture-arts", parentSlug: "lifestyle" },

  // Crime & Security subcategories
  { name: "Law Enforcement", slug: "law-enforcement", parentSlug: "crime-security" },
  { name: "Court Cases", slug: "court-cases", parentSlug: "crime-security" },
  { name: "Cybercrime", slug: "cybercrime", parentSlug: "crime-security" },
  { name: "Public Safety", slug: "public-safety", parentSlug: "crime-security" },

  // Religion & Faith subcategories
  { name: "Christianity", slug: "christianity", parentSlug: "religion-faith" },
  { name: "Islam", slug: "islam", parentSlug: "religion-faith" },
  { name: "Hinduism", slug: "hinduism", parentSlug: "religion-faith" },
  { name: "Interfaith Issues", slug: "interfaith-issues", parentSlug: "religion-faith" },
  { name: "Religious Events", slug: "religious-events", parentSlug: "religion-faith" },

  // Local / Regional subcategories
  { name: "County/City News", slug: "county-city-news", parentSlug: "local-regional" },
  { name: "Community Highlights", slug: "community-highlights", parentSlug: "local-regional" },
  { name: "Local Economy", slug: "local-economy", parentSlug: "local-regional" },
  { name: "Events", slug: "events", parentSlug: "local-regional" },

  // Breaking News subcategories
  { name: "Urgent Events", slug: "urgent-events", parentSlug: "breaking-news" },
  { name: "Live Updates", slug: "live-updates", parentSlug: "breaking-news" },
  { name: "Trending Topics", slug: "trending-topics", parentSlug: "breaking-news" },

  // Opinion Polls & Analysis subcategories
  { name: "Surveys", slug: "surveys", parentSlug: "opinion-polls-analysis" },
  { name: "Predictions", slug: "predictions", parentSlug: "opinion-polls-analysis" },
  { name: "Data Journalism", slug: "data-journalism", parentSlug: "opinion-polls-analysis" },

  // Culture subcategories
  { name: "Art", slug: "art", parentSlug: "culture" },
  { name: "Literature", slug: "literature", parentSlug: "culture" },
  { name: "Heritage", slug: "heritage", parentSlug: "culture" },
  { name: "Photography", slug: "photography", parentSlug: "culture" },

  // Autos & Transport subcategories
  { name: "Automotive News", slug: "automotive-news", parentSlug: "autos-transport" },
  { name: "Electric Vehicles", slug: "electric-vehicles", parentSlug: "autos-transport" },
  { name: "Public Transport", slug: "public-transport", parentSlug: "autos-transport" },
  { name: "Aviation", slug: "aviation", parentSlug: "autos-transport" },
];

const seedData = [
  // Skip articles for now since they need proper author IDs and categories
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing records (optional)
    await Category.deleteMany({});
    console.log("🧹 Existing categories cleared");

    // Insert parent categories first
    const parentCategories = await Category.insertMany(categoryData);
    console.log("🌱 Parent categories seeded");

    // Create a map of parent slugs to IDs
    const parentMap = {};
    parentCategories.forEach(cat => {
      parentMap[cat.slug] = cat._id;
    });

    // Insert subcategories with parent references
    const subcategoriesWithParents = subcategoryData.map(sub => ({
      ...sub,
      parent: parentMap[sub.parentSlug]
    }));

    await Category.insertMany(subcategoriesWithParents);
    console.log("🌱 Subcategories seeded");

    console.log("✅ Database seeded with hierarchical categories");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
