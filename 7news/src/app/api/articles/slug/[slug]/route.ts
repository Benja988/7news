import Article from "@/lib/models/Article";
import { connectDB } from "@/lib/mongodb";

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  await connectDB();

  const { slug } = await context.params; 

  const article = await Article.findOneAndUpdate(
    { slug, status: "published" },
    { $inc: { views: 1 } }, 
    { new: true }
  ).populate("author", "name");

  if (!article) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(article);
}
