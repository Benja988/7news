// app/api/users/[id]/role/route.ts
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { requireAuth } from "@/lib/requireAuth";
import { badRequest } from "@/lib/response";

export const PATCH = requireAuth(["admin"])(async (req: any, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();

  const { id } = await params;
  const { role } = await req.json();

  if (!["user", "writer", "editor", "admin"].includes(role)) {
    return badRequest("Invalid role");
  }

  // prevent removing the last admin
  if (role !== "admin") {
    const target = await User.findById(id);
    if (target?.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return badRequest("Cannot demote the last admin");
      }
    }
  }

  const updated = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!updated) return badRequest("User not found");

  return Response.json({
    id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
  });
});
