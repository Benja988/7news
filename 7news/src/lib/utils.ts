export function getIP(req: Request) {
  // Next runs on edge/runtime variants; grab IP safely
  // @ts-ignore
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
}

export function toSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
