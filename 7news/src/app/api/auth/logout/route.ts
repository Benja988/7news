import { NextRequest } from "next/server";
import { clearAuthCookies } from "@/lib/auth";
import { ok } from "@/lib/response";

export async function POST(_: NextRequest) {
  clearAuthCookies();
  return ok({ message: "Logged out" });
}
