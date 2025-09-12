// app/api/users/[id]/status/route.ts

import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { requireAuth } from "@/lib/requireAuth";
import { badRequest, notFound } from "@/lib/response";

export const PATCH = requireAuth(["admin"])(async (req: any, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();

  const { id } = await params;

  const { isActive } = await req.json();

  if (typeof isActive !== "boolean") return badRequest("Invalid status");

  const user = await User.findByIdAndUpdate(id, { isActive }, { new: true }).select("-password");
  if (!user) return notFound();

  return Response.json(user);
});
