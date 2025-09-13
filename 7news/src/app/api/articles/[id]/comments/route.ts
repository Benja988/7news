// app/api/articles/[id]/comments/route.ts 

import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import Comment from "@/lib/models/Comment";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const comments = await Comment.find({ article: id, status: "approved" })
    .populate("author", "name")
    .sort({ createdAt: -1 })
    .lean();
  return Response.json(comments);
}

// 🔹 Protected: Post comment 
export const POST = requireAuth([])(async (req: any, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const comment = await Comment.create({ ...body, article: id, author: req.user.sub });
  return Response.json(comment, { status: 201 });
});