import { cookies } from "next/headers";
import { verifyToken, signAccessToken, setAuthCookies } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { unauthorized, ok, error500 } from "@/lib/response";

export async function POST() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) return unauthorized("Missing refresh token");

    // verify refresh token
    const payload: any = verifyToken(refreshToken);
    if (!payload || !payload.sub) return unauthorized("Invalid refresh token");

    // check if user still exists
    const user = await User.findById(payload.sub);
    if (!user) return unauthorized("User not found");

    // issue new access token
    const newAccessToken = await signAccessToken(user);

    // update cookies
    await setAuthCookies(newAccessToken, refreshToken);

    return ok({ accessToken: newAccessToken });
  } catch (e) {
    console.error("Refresh error:", e);
    return error500();
  }
}
