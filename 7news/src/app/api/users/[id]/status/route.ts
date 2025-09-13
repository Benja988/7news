// app/api/users/[id]/status/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { requireAuth } from "@/lib/requireAuth";
import { badRequest, error500, notFound } from "@/lib/response";
import logger from "@/lib/logger";

const userLogger = logger.child("user:status");

export const PATCH = requireAuth(["admin"])(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const requestId = req.headers.get("x-request-id") || undefined;
    try {
      await connectDB();
      const { id } = await params;
      const { isActive } = await req.json();

      if (typeof isActive !== "boolean") {
        userLogger.warn(`Invalid status update attempt: ${isActive}`, { requestId, userId: id });
        return badRequest("Invalid status");
      }

      const user = await User.findByIdAndUpdate(id, { isActive }, { new: true }).select("-password");
      if (!user) {
        userLogger.warn(`User not found for status update: ${id}`, { requestId });
        return notFound();
      }

      userLogger.info(`User status updated: ${user.email} to ${isActive}`, { userId: id, requestId });

      return Response.json({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      });
    } catch (e: any) {
      userLogger.error(e, { requestId, userId: (await params).id, context: "Error updating user status" });
      return error500("Internal server error");
    }
  }
);