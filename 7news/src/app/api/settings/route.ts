import { connectDB } from "@/lib/mongodb";
import Setting from "@/lib/models/Setting";

export async function GET() {
  await connectDB();
  const settings = await Setting.find();
  return Response.json(settings);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const setting = await Setting.create(data);
  return Response.json(setting);
}
