import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
);

const level = () => {
  return "debug";
};

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "./src/logs/warn.log",
    level: "warn",
    colorize: true,
    json: true,
  }),
  new winston.transports.File({
    filename: "./src/logs/error.log",
    level: "error",
    colorize: true,
    json: true,
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
