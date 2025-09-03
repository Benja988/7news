import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Articles from "@/lib/models/Articles";

// GET /api/articles/:id
export async function GET(req: Request, { params }: any) {
  await connectDB();
  const article = await Articles.findById(params.id);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(article);
}

// PUT /api/articles/:id
export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const body = await req.json();
  const article = await Articles.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(article);
}

// DELETE /api/articles/:id
export async function DELETE(req: Request, { params }: any) {
  await connectDB();
  await Articles.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" });
}
