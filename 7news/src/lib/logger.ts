import pino from "pino";

const level = process.env.LOG_LEVEL || "info";

export const logger = pino({
  level,
  base: undefined, // remove pid,hostname in logs
  redact: { paths: ["req.headers.authorization", "password"], remove: true },
  transport: process.env.NODE_ENV === "development" ? { target: "pino-pretty" } : undefined,
});
