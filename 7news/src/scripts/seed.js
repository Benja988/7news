import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from "../lib/models/Article.js"; // ✅ adjust path if needed

// Load .env variables
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const seedData = [
  {
    title: "Kenya Elections 2025 Update",
    content: "Breaking news about upcoming elections in Kenya...",
    author: "Benjamin Okinyi",
    tags: ["politics", "kenya", "breaking"],
    published: true,
  },
  {
    title: "Tech in Africa 2025",
    content: "African startups are scaling faster than ever before...",
    author: "Tech Desk",
    tags: ["technology", "africa", "startups"],
    published: true,
  },
  {
    title: "Global Climate Change Impact",
    content: "New reports show climate shifts across the globe...",
    author: "Environment Reporter",
    tags: ["climate", "environment", "global"],
    published: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing records (optional)
    await Article.deleteMany({});
    console.log("🧹 Existing news cleared");

    // Insert sample records
    await Article.insertMany(seedData);
    console.log("🌱 Database seeded with test news articles");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
