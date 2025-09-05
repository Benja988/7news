// src/app/api/me/route.ts
import { NextRequest } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { ok, unauthorized } from "@/lib/response";
import { connectDB } from "@/lib/mongodb";
import User, { IUser } from "@/lib/models/User";

export async function GET(_: NextRequest) {
  try {
    await connectDB();

    const payload = await getUserFromCookies();
    if (!payload || !payload.sub) {
      return unauthorized("Not authenticated");
    }

    // Find a single user by ID
    const user = await User.findById(payload.sub).lean<IUser | null>();
    if (!user) {
      return unauthorized("User not found");
    }

    // Only return safe fields
    const safeUser = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return ok(safeUser);
  } catch (err) {
    console.error("❌ /api/me error:", err);
    return unauthorized("Invalid session");
  }
}
