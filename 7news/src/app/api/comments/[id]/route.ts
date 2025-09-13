// app/api/[slug]/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";
import { ok, notFound, unauthorized, forbidden, error500 } from "@/lib/response";
import { getUserFromCookies, requireRole } from "@/lib/auth";
// import logger from "@/lib/logger";


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const user = await getUserFromCookies();
    if (!user) return unauthorized();
    if (!requireRole(["admin","editor"], user.role)) return forbidden();

    const json = await req.json();
    const doc = await Comment.findByIdAndUpdate(id, json, { new: true });
    if (!doc) return notFound();
    // logger.info({ commentId: id, by: user.sub }, "Comment updated");
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
    if (!requireRole(["admin","editor"], user.role)) return forbidden();

    const del = await Comment.findByIdAndDelete(id);
    if (!del) return notFound();
    // logger.warn({ commentId: id, by: user.sub }, "Comment deleted");
    return ok({ deleted: true });
  } catch (e) {
    return error500();
  }
}
