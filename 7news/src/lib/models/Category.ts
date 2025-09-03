import { Schema, model, models } from "mongoose";

export interface ICategory {
  _id: any;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true, trim: true, maxlength: 60 },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  description: { type: String, maxlength: 200 },
}, { timestamps: true });

CategorySchema.index({ slug: 1 });

export default models.Category || model<ICategory>("Category", CategorySchema);
