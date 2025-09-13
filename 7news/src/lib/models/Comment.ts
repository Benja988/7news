// lib/models/Comment.ts (New model for comments feature)

import { Schema, model, models, Types, Model } from "mongoose";
import User from "./User";
import Article from "./Article";

export interface IComment {
  _id: Types.ObjectId;
  article: Types.ObjectId;
  author: Types.ObjectId | "guest"; // Allow guest comments if desired
  content: string;
  parent?: Types.ObjectId; // For nested replies
  likes: number;
  status: "pending" | "approved" | "rejected"; // Moderation
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    article: { type: Schema.Types.ObjectId, ref: Article, required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: User, required: true }, // Change to String for guests if needed
    content: { type: String, required: true, trim: true },
    parent: { type: Schema.Types.ObjectId, ref: "Comment" },
    likes: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

CommentSchema.post("save", async function () {
  // Update article's commentsCount
  const count = await this.model("Comment").countDocuments({ article: this.article, status: "approved" });
  await Article.findByIdAndUpdate(this.article, { commentsCount: count });
});

CommentSchema.index({ article: 1, createdAt: -1 });

const Comment: Model<IComment> =
  (models.Comment as Model<IComment>) || model<IComment>("Comment", CommentSchema);

export default Comment;