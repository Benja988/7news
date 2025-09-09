// app/api/articles/drafts/route.ts
import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";

export const GET = requireAuth(["writer", "editor", "admin"])(async (req: any) => {
  await connectDB();
  const drafts = await Article.find({ author: req.user.id, status: "draft" }).sort({ updatedAt: -1 });
  return Response.json(drafts);
});
