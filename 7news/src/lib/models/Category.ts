// models/Category.ts
import { Schema, model, models, Types, Model } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true, maxlength: 60 },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, maxlength: 200 },
  },
  { timestamps: true }
);

// Optional: add text index if needed later
// CategorySchema.index({ slug: 1 });

const Category = (models.Category as Model<ICategory>) || model<ICategory>("Category", CategorySchema);

export default Category;
