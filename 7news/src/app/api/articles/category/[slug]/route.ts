// app/api/articles/category/[slug]/route.ts
import Article from "@/lib/models/Article";
import Category from "@/lib/models/Category";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");

  const category = await Category.findOne({ slug: params.slug });
  if (!category) return Response.json({ message: "Category not found" }, { status: 404 });

  const filter = { category: category._id, status: "published" };
  const total = await Article.countDocuments(filter);

  const articles = await Article.find(filter)
    .populate("author", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return Response.json({ articles, totalPages: Math.ceil(total / limit), currentPage: page });
}
