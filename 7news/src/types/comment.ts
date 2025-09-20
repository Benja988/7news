// src/types/comment.ts
export type Comment = {
  _id: string;
  content: string; // or 'text' — make sure this matches your DB field
  createdAt: string;
  author?: { name: string }; // or 'author' if that's the field from backend
};
