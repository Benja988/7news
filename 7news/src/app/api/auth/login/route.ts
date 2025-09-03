import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { loginSchema } from "@/lib/validations";
import { badRequest, ok, unauthorized, error500 } from "@/lib/response";
import { logger } from "@/lib/logger";
import { signAccessToken, signRefreshToken, setAuthCookies } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const json = await req.json();
    const parsed = loginSchema.safeParse(json);
    if (!parsed.success) return badRequest("Invalid credentials");

    const user = await User.findOne({ email: parsed.data.email }).select("+password");
    if (!user) return unauthorized("Invalid credentials");

    const valid = await bcrypt.compare(parsed.data.password, user.password);
    if (!valid) return unauthorized("Invalid credentials");

    const at = await signAccessToken(user);
    const rt = await signRefreshToken(user);
    setAuthCookies(at, rt);

    logger.info({ userId: user._id }, "User logged in");
    return ok({ id: user._id, email: user.email, name: user.name, role: user.role });
  } catch (e) {
    logger.error(e, "Login error");
    return error500();
  }
}
