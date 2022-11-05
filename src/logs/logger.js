import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "./src/logs/warn.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "./src/logs/error.log",
      level: "error",
    }),
  ],
});

export default logger;
