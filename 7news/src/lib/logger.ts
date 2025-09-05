/* eslint-disable no-console */
import fs from "fs";
import path from "path";

type LogData = string | Record<string, any> | Error;

const logDir = path.join(process.cwd(), "logs");

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function formatMessage(message: LogData, context?: string) {
  if (typeof message === "string") {
    return context ? `${context} - ${message}` : message;
  }
  if (message instanceof Error) {
    return `${context ? context + " - " : ""}${message.message}\n${message.stack}`;
  }
  return `${context ? context + " - " : ""}${JSON.stringify(message)}`;
}

function writeToFile(level: string, formatted: string) {
  const filePath = path.join(logDir, `${new Date().toISOString().split("T")[0]}.log`);
  const logEntry = `${new Date().toISOString()} [${level}] ${formatted}\n`;
  fs.appendFileSync(filePath, logEntry);
}

const logger = {
  info(message: LogData, context?: string) {
    const formatted = formatMessage(message, context);
    console.log("ℹ️ [INFO]", formatted);
    if (process.env.NODE_ENV === "production") writeToFile("INFO", formatted);
  },
  warn(message: LogData, context?: string) {
    const formatted = formatMessage(message, context);
    console.warn("⚠️ [WARN]", formatted);
    if (process.env.NODE_ENV === "production") writeToFile("WARN", formatted);
  },
  error(message: LogData, context?: string) {
    const formatted = formatMessage(message, context);
    console.error("❌ [ERROR]", formatted);
    if (process.env.NODE_ENV === "production") writeToFile("ERROR", formatted);
  },
};

export default logger;
