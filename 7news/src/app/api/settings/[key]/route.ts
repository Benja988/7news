import { connectDB } from "@/lib/mongodb";
import Setting from "@/lib/models/Setting";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  await connectDB();

  const { key } = await params;
  const setting = await Setting.findOne({ key });
  if (!setting) return Response.json({ message: "Setting not found" }, { status: 404 });

  return Response.json(setting);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  await connectDB();

  const { key } = await params;
  const data = await req.json();

  const updated = await Setting.findOneAndUpdate({ key }, data, {
    new: true,
    upsert: true,
  });

  return Response.json(updated);
}
