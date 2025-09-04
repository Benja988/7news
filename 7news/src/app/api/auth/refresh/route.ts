import { NextRequest } from "next/server";
import { verifyToken, signAccessToken, setAuthCookies } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { unauthorized, ok, error500 } from "@/lib/response";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const refreshToken = req.cookies.get("refresh_token")?.value;
    if (!refreshToken) return unauthorized("Missing refresh token");

    const payload = await verifyToken(refreshToken); 
    if (!payload || !payload.sub) return unauthorized("Invalid refresh token");

    const user = await User.findById(payload.sub);
    if (!user) return unauthorized("User not found");

    const newAt = await signAccessToken(user); 

    await setAuthCookies(newAt, refreshToken); 

    return ok({ accessToken: newAt });
  } catch (e) {
    return error500();
  }
}
