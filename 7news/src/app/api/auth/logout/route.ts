import { clearAuthCookies } from "@/lib/auth";
import { ok } from "@/lib/response";

export async function POST() {
  await clearAuthCookies();
  return ok({ message: "Logged out successfully" });
}
