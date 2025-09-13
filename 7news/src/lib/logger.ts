/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import winston from "winston";
import { v4 as uuidv4 } from "uuid";

// Define log directory
const logDir = path.join(process.cwd(), "logs");

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Custom Winston format to include request ID and context
const customFormat = winston.format.printf(({ level, message, timestamp, requestId, context }) => {
  const formattedMessage =
    typeof message === "string"
      ? message
      : message instanceof Error
      ? `${message.message}\n${message.stack}`
      : JSON.stringify(message, null, 2);
  return `${timestamp} [${level.toUpperCase()}]${requestId ? ` [${requestId}]` : ""}${
    context ? ` [${context}]` : ""
  } ${formattedMessage}`;
});

// Create Winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info", // Configurable log level via env
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }), // Include stack traces for errors
    customFormat
  ),
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize logs for better readability in console
        customFormat
      ),
    }),
    // File transport for production (daily rotation)
    new winston.transports.File({
      filename: path.join(logDir, `${new Date().toISOString().split("T")[0]}.log`),
      maxsize: 10 * 1024 * 1024, // 10MB per file
      maxFiles: 7, // Keep 7 days of logs
      tailable: true, // Rotate logs
      zippedArchive: true, // Compress old logs
    }),
  ],
});

// Middleware to add request ID to logs for tracing
const addRequestId = winston.format((info) => {
  info.requestId = uuidv4(); // Unique ID per request
  return info;
});

// Stream for Express/Next.js API logging
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export interface LoggerOptions extends Record<string, any> {
  context?: string;
  requestId?: string;
  userId?: string;
}

function formatMessage(message: string | Record<string, any> | Error): string {
  if (typeof message === "string") return message;
  if (message instanceof Error) return `${message.message}\n${message.stack}`;
  return JSON.stringify(message, null, 2);
}

const enhancedLogger = {
  info(message: string | Record<string, any> | Error, options: LoggerOptions = {}) {
    logger.info(formatMessage(message), { ...options });
  },
  warn(message: string | Record<string, any> | Error, options: LoggerOptions = {}) {
    logger.warn(formatMessage(message), { ...options });
  },
  error(message: string | Record<string, any> | Error, options: LoggerOptions = {}) {
    logger.error(formatMessage(message), { ...options });
  },
  // Add debug level for detailed logging during development
  debug(message: string | Record<string, any> | Error, options: LoggerOptions = {}) {
    logger.debug(formatMessage(message), { ...options });
  },
  // Method to log HTTP requests
  http(message: string, options: LoggerOptions = {}) {
    logger.http(message, { ...options });
  },
  // Stream for integration with HTTP middleware
  stream,
  // Method to create a child logger with specific context
  child(context: string) {
    return {
      info: (message: string | Record<string, any> | Error, opts: LoggerOptions = {}) =>
        this.info(message, { context, ...opts }),
      warn: (message: string | Record<string, any> | Error, opts: LoggerOptions = {}) =>
        this.warn(message, { context, ...opts }),
      error: (message: string | Record<string, any> | Error, opts: LoggerOptions = {}) =>
        this.error(message, { context, ...opts }),
      debug: (message: string | Record<string, any> | Error, opts: LoggerOptions = {}) =>
        this.debug(message, { context, ...opts }),
      http: (message: string, opts: LoggerOptions = {}) =>
        this.http(message, { context, ...opts }),
    };
  },
};

// Export logger and types
export default enhancedLogger;