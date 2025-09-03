import mongoose, { Schema, model, models } from "mongoose";

const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

export default models.Article || model("Article", ArticleSchema);
