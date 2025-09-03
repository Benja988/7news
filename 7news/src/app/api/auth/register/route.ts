import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { registerSchema } from "@/lib/validations";
import { badRequest, created, error500 } from "@/lib/response";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const json = await req.json();
    const parsed = registerSchema.safeParse(json);
    if (!parsed.success) return badRequest(parsed.error.flatten().formErrors.join(", "));

    const exists = await User.findOne({ email: parsed.data.email });
    if (exists) return badRequest("Email already in use");

    const user = await User.create({ ...parsed.data, role: "user" });
    logger.info({ userId: user._id }, "User registered");
    return created({ id: user._id, email: user.email, name: user.name });
  } catch (e) {
    logger.error(e, "Register error");
    return error500();
  }
}
