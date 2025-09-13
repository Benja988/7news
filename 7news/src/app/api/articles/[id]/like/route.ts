// app/api/articles/[id]/like/route.ts (New: For liking articles; requires auth)

import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import Article from "@/lib/models/Article";
// Note: To prevent multiple likes, consider a separate Like model with unique user-article constraint

export const POST = requireAuth([])(async (_: Request, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();
  const { id } = await params;
  const article = await Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
  if (!article) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json({ likes: article.likes });
});