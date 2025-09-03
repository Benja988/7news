import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Article from "@/lib/models/Article";
import { ok, badRequest } from "@/lib/response";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (!q) return badRequest("Missing q");
  const items = await Article.find(
    { $text: { $search: q }, status: "published" },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(20)
    .select("title slug excerpt coverImage createdAt");
  return ok(items);
}
