// app/api/articles/[id]/route.ts (Enhanced with scheduling logic if needed; added like endpoint in separate route)

import { connectDB } from "@/lib/mongodb";
import { requireAuth } from "@/lib/requireAuth";
import Article from "@/lib/models/Article";

// GET, PUT, DELETE remain similar, but add handling for new fields
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const article = await Article.findById(id)
    .populate("author", "name")
    .populate("category", "name")
    .populate("relatedArticles", "title slug");
  if (!article) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(article);
}

export const PUT = requireAuth(["admin", "editor"])(async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  // If scheduling, ensure publishedAt is set only on publish
  if (body.status === "published" && body.scheduledPublishAt) {
    body.publishedAt = body.scheduledPublishAt;
    delete body.scheduledPublishAt;
  }
  const article = await Article.findByIdAndUpdate(id as string, body, { new: true });
  if (!article) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(article);
});

export const DELETE = requireAuth(["admin"])(async (_: Request, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();
  const { id } = await params;
  await Article.findByIdAndDelete(id as string);
  return Response.json({ message: "Deleted" });
});