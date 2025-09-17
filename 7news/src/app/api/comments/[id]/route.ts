// app/api/comments/[id]/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";
import { ok, notFound, unauthorized, forbidden, error500 } from "@/lib/response";
import { getUserFromCookies, requireRole } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin", "editor"], user.role)) return forbidden();

    const json = await req.json();
    const allowedFields = ["content", "status", "likes"]; // ✅ prevent malicious updates
    const update: any = {};
    for (const key of allowedFields) {
      if (key in json) update[key] = json[key];
    }

    const doc = await Comment.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return notFound();

    return ok(doc);
  } catch (e) {
    return error500();
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin", "editor"], user.role)) return forbidden();

    const del = await Comment.findByIdAndDelete(id);
    if (!del) return notFound();

    return ok({ deleted: true });
  } catch (e) {
    return error500();
  }
}

