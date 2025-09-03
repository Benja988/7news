import { NextRequest } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { ok, unauthorized } from "@/lib/response";

export async function GET(_: NextRequest) {
  const user = await getUserFromCookies();
  if (!user) return unauthorized();
  return ok(user);
}
