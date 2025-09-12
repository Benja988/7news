// app/api/users/[id]/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { requireAuth } from "@/lib/requireAuth";
import { badRequest, notFound } from "@/lib/response";

export const GET = requireAuth(["admin", "editor"])(async (_: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB();
  const user = await User.findById(params.id).select("-password");
  if (!user) return notFound();
  return Response.json(user);
});

export const PATCH = requireAuth(["admin"])(async (req: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB();
  const body = await req.json();

  const updated = await User.findByIdAndUpdate(params.id, body, { new: true }).select("-password");
  if (!updated) return notFound();

  return Response.json(updated);
});

export const DELETE = requireAuth(["admin"])(async (_: NextRequest, { params }: { params: { id: string } }) => {
  await connectDB();

  // prevent deleting the last admin
  const target = await User.findById(params.id);
  if (target?.role === "admin") {
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      return badRequest("Cannot delete the last admin");
    }
  }

  const deleted = await User.findByIdAndDelete(params.id);
  if (!deleted) return notFound();
  return Response.json({ deleted: true });
});
