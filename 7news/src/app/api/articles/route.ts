import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Articles from "@/lib/models/Articles";

// POST /api/articles -> Create
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const article = await Articles.create(body);
    return NextResponse.json(article, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// GET /api/articles -> Get All
export async function GET() {
  await connectDB();
  const articles = await Articles.find().sort({ createdAt: -1 });
  return NextResponse.json(articles);
}
