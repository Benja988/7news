// models/Category.ts
import { Schema, model, models, Types, Model } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  parent?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, maxlength: 200 },
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  },
  { timestamps: true }
);

// Add compound index to ensure unique name per parent level
CategorySchema.index({ name: 1, parent: 1 }, { unique: true });

const Category = (models.Category as Model<ICategory>) || model<ICategory>("Category", CategorySchema);

export default Category;
