import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { ok, notFound } from "@/lib/response";

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  await connectDB();
  const doc = await Article.findOne({ slug: params.slug, status: "published" })
    .populate("author", "name")
    .populate("category", "name slug");
  if (!doc) return notFound();
  return ok(doc);
}
