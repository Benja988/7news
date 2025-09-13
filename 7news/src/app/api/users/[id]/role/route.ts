// app/api/users/[id]/role/route.ts
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { requireAuth } from "@/lib/requireAuth";
import { badRequest, error500, notFound } from "@/lib/response";
import logger from "@/lib/logger";

const userLogger = logger.child("user:role");

export const PATCH = requireAuth(["admin"])(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const requestId = req.headers.get("x-request-id") || undefined;
    try {
      await connectDB();
      const { id } = await params;
      const { role } = await req.json();

      if (!["user", "writer", "editor", "moderator", "admin"].includes(role)) {
        userLogger.warn(`Invalid role update attempt: ${role}`, { requestId, userId: id });
        return badRequest("Invalid role");
      }

      // Prevent removing the last admin
      if (role !== "admin") {
        const target = await User.findById(id);
        if (target?.role === "admin") {
          const adminCount = await User.countDocuments({ role: "admin" });
          if (adminCount <= 1) {
            userLogger.warn("Attempt to demote last admin", { requestId, userId: id });
            return badRequest("Cannot demote the last admin");
          }
        }
      }

      const updated = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
      if (!updated) {
        userLogger.warn(`User not found for role update: ${id}`, { requestId });
        return notFound();
      }

      userLogger.info(`User role updated: ${updated.email} to ${role}`, { userId: id, requestId });

      return Response.json({
        id: updated._id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
      });
    } catch (e: any) {
      userLogger.error(e, { requestId, userId: (await params).id, context: "Error updating user role" });
      return error500("Internal server error");
    }
  }
);
