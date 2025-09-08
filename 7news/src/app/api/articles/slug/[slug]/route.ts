// app/api/articles/slug/[slug]/route.ts
import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  await connectDB();
  const article = await Article.findOneAndUpdate(
    { slug: params.slug, status: "published" },
    { $inc: { views: 1 } }, // 🔹 increment views
    { new: true }
  ).populate("author", "name");

  if (!article) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(article);
}
