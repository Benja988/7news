import { Schema, model, models, Types } from "mongoose";

export interface IComment {
  _id: any;
  article: Types.ObjectId;
  user: Types.ObjectId;
  content: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
  article: { type: Schema.Types.ObjectId, ref: "Article", required: true, index: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  content: { type: String, required: true, maxlength: 2000 },
  isApproved: { type: Boolean, default: false, index: true },
}, { timestamps: true });

CommentSchema.index({ createdAt: -1 });

export default models.Comment || model<IComment>("Comment", CommentSchema);
