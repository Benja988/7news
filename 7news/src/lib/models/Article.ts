import { Schema, model, models, Types, Model } from "mongoose";
import slugify from "slugify";
import User from "./User";
import Category from "./Category";

export interface IArticle {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  tags: string[];
  status: "draft" | "published";
  publishedAt?: Date;
  views: number;
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
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ArticleSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

ArticleSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

ArticleSchema.index({ title: "text", excerpt: "text", content: "text", tags: 1 });
ArticleSchema.index({ createdAt: -1 });

const Article: Model<IArticle> =
  (models.Article as Model<IArticle>) || model<IArticle>("Article", ArticleSchema);

export default Article;
