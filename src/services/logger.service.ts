import * as winston from "winston";

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
	return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston.format.errors({ stack: true }), winston.format.splat(), logFormat),
	transports: [new winston.transports.Console(), new winston.transports.File({ filename: "logs/error.log", level: "error" }), new winston.transports.File({ filename: "logs/combined.log" })],
});

export default logger;
