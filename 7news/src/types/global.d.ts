// src/types/global.d.ts

import type mongoose from "mongoose";

declare global {
  
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

declare module "*.css";

export {};
