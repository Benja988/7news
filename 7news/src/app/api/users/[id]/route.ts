// app/api/users/[id]/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { requireAuth } from "@/lib/requireAuth";
import { badRequest, error500, notFound } from "@/lib/response";
import logger from "@/lib/logger";

const userLogger = logger.child("user:single");

export const GET = requireAuth(["admin", "editor"])(
  async (_: NextRequest, { params }: { params: { id: string } }) => {
    const requestId = _.headers.get("x-request-id") || undefined;
    try {
      await connectDB();
      const user = await User.findById(params.id).select("-password");
      if (!user) {
        userLogger.warn(`User not found: ${params.id}`, { requestId });
        return notFound();
      }

      userLogger.info(`User retrieved: ${user.email}`, { userId: params.id, requestId });

      return Response.json({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        profile: user.profile,
        preferences: user.preferences,
        lastLogin: user.lastLogin,
      });
    } catch (e: any) {
      userLogger.error(e, { requestId, userId: params.id, context: "Error retrieving user" });
      return error500("Internal server error");
    }
  }
);

export const PATCH = requireAuth(["admin"])(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const requestId = req.headers.get("x-request-id") || undefined;
    try {
      await connectDB();
      const body = await req.json();

      // Validate fields that can be updated
      const allowedFields = ["name", "profile", "preferences"];
      const updates = Object.keys(body).reduce((acc, key) => {
        if (allowedFields.includes(key)) acc[key] = body[key];
        return acc;
      }, {} as any);

      const updated = await User.findByIdAndUpdate(params.id, updates, { new: true }).select("-password");
      if (!updated) {
        userLogger.warn(`User not found for update: ${params.id}`, { requestId });
        return notFound();
      }

      userLogger.info(`User updated: ${updated.email}`, { userId: params.id, requestId });

      return Response.json({
        id: updated._id,
        email: updated.email,
        name: updated.name,
        role: updated.role,
        isActive: updated.isActive,
        profile: updated.profile,
        preferences: updated.preferences,
      });
    } catch (e: any) {
      userLogger.error(e, { requestId, userId: params.id, conext: "Error updating user" });
      return error500("Internal server error");
    }
  }
);

export const DELETE = requireAuth(["admin"])(
  async (_: NextRequest, { params }: { params: { id: string } }) => {
    const requestId = _.headers.get("x-request-id") || undefined;
    try {
      await connectDB();

      // Prevent deleting the last admin
      const target = await User.findById(params.id);
      if (target?.role === "admin") {
        const adminCount = await User.countDocuments({ role: "admin" });
        if (adminCount <= 1) {
          userLogger.warn("Attempt to delete last admin", { requestId, userId: params.id });
          return badRequest("Cannot delete the last admin");
        }
      }

      const deleted = await User.findByIdAndDelete(params.id);
      if (!deleted) {
        userLogger.warn(`User not found for deletion: ${params.id}`, { requestId });
        return notFound();
      }

      userLogger.info(`User deleted: ${deleted.email}`, { userId: params.id, requestId });

      return Response.json({ deleted: true });
    } catch (e: any) {
      userLogger.error(e, { requestId, userId: params.id, context: "Error deleting user" });
      return error500("Internal server error");
    }
  }
);
