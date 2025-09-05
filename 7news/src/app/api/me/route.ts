// src/app/api/me/route.ts
import { NextRequest } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { ok, unauthorized } from "@/lib/response";

export async function GET(_: NextRequest) {
  try {
    const user = await getUserFromCookies();
    if (!user) return unauthorized("Not authenticated");

    // Avoid sending password/hash
    const safeUser = {
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
