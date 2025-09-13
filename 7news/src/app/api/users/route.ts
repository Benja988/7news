// app/api/users/route.ts

import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { requireAuth } from "@/lib/requireAuth";
import { badRequest, created, error500 } from "@/lib/response";
import logger from "@/lib/logger";

const userLogger = logger.child("users");

export const GET = requireAuth(["admin", "editor"])(
  async (_: NextRequest) => {
    const requestId = _.headers.get("x-request-id") || undefined;
    try {
      await connectDB();
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 })
        .lean();

      userLogger.info("Users retrieved", { requestId, count: users.length });

      return Response.json(
        users.map((user) => ({
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive,
          profile: user.profile,
          preferences: user.preferences,
          lastLogin: user.lastLogin,
        }))
      );
    } catch (e: any) {
      userLogger.error(e, { requestId, context: "Error retrieving users" });
      return error500("Internal server error");
    }
  }
);

export const POST = requireAuth(["admin"])(
  async (req: NextRequest) => {
    const requestId = req.headers.get("x-request-id") || undefined;
    try {
      await connectDB();
      const { name, email, password, role } = await req.json();

      if (!name || !email || !password) {
        userLogger.warn("Missing fields in user creation", { requestId });
        return badRequest("Missing fields");
      }

      if (!["user", "writer", "editor", "moderator", "admin"].includes(role)) {
        userLogger.warn(`Invalid role: ${role}`, { requestId });
        return badRequest("Invalid role");
      }

      const exists = await User.findOne({ email });
      if (exists) {
        userLogger.warn(`Email already exists: ${email}`, { requestId });
        return badRequest("Email already exists");
      }

      const user = await User.create({ name, email, password, role });

      userLogger.info(`User created: ${user.email}`, { userId: user._id.toString(), requestId });

      return created({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      });
    } catch (e: any) {
      userLogger.error(e, { requestId, context: "Error creating user" });
      return error500("Internal server error");
    }
  }
);
