// lib/models/Article.ts (Enhanced with additional fields and features)

import { Schema, model, models, Types, Model } from "mongoose";
import slugify from "slugify";
import User from "./User";
import Category from "./Category";

export interface IArticle {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  excerpt?: string;
  content: string; // Assume this is HTML or Markdown; consider adding a field for format if needed
  coverImage?: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  tags: string[];
  status: "draft" | "published" | "archived"; // Added 'archived' for better content management
  publishedAt?: Date;
  scheduledPublishAt?: Date; // New: For scheduling future publications
  views: number;
  likes: number; // New: Basic like count for user engagement
  commentsCount: number; // New: Track number of comments
  isFeatured: boolean; // New: Flag for featured articles (e.g., homepage highlights)
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  }; // New: SEO fields for better search engine optimization
  relatedArticles?: Types.ObjectId[]; // New: Array of related article IDs (manually or auto-populated)
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, maxlength: 300 },
    content: { type: String, required: true },
    coverImage: { type: String },
    author: { type: Schema.Types.ObjectId, ref: User, required: true, index: true },
    category: { type: Schema.Types.ObjectId, ref: Category, required: true, index: true },
    tags: [{ type: String, lowercase: true, trim: true }],
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },
    publishedAt: { type: Date },
    scheduledPublishAt: { type: Date }, // For scheduling
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    seo: {
      metaTitle: { type: String, trim: true },
      metaDescription: { type: String, trim: true },
      keywords: [{ type: String, trim: true }],
    },
    relatedArticles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  },
  { timestamps: true }
);

ArticleSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

ArticleSchema.pre("save", async function (next) {
  if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  // Auto-populate related articles if not set (simple tag-based suggestion; can be enhanced)
  if (!this.relatedArticles?.length && this.tags?.length) {
    const similar = await this.model("Article").find({
      _id: { $ne: this._id },
      tags: { $in: this.tags },
      status: "published",
    }).limit(5).select("_id");
    this.relatedArticles = similar.map((a) => a._id);
  }
  next();
});

// Enhanced indexing for better search and filtering
ArticleSchema.index({ title: "text", excerpt: "text", content: "text", tags: "text" });
ArticleSchema.index({ createdAt: -1 });
ArticleSchema.index({ views: -1 }); // For popular articles
ArticleSchema.index({ likes: -1 }); // For most liked
ArticleSchema.index({ category: 1, publishedAt: -1 });
ArticleSchema.index({ tags: 1 });
ArticleSchema.index({ isFeatured: 1 });

const Article: Model<IArticle> =
  (models.Article as Model<IArticle>) || model<IArticle>("Article", ArticleSchema);

export default Article;