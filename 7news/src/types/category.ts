// types/category.ts
export interface Category {
  _id: string;            // string for client-side (ObjectId → string)
  name: string;
  slug: string;
  description?: string;
  parent?: string | null; // parent category ID
  articleCount?: number;  // optional, if you populate with article counts
  createdAt?: string;     // string because JSON serializes dates
  updatedAt?: string;
}
