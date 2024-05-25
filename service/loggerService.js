const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const apiLogger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./api/logs/combined.log" }),
    new transports.File({ filename: "./api/logs/error.log", level: "error" }),
  ],
});

const queueLogger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: "./queue/logs/combined.log" }),
    new transports.File({ filename: "./queue/logs/error.log", level: "error" }),
  ],
});

module.exports = { apiLogger, queueLogger };
