import winston from "winston";
// Default exported function that will set up Winston for logging
// Getting the required function from the format module
const { combine, timestamp, label, printf } = winston.format;

// Creating a custom formats for logs
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp}, ${level.toUpperCase()} [${label}] => ${message}`;
});

// Create a logger using winston
const logger = winston.createLogger({
  // Setting the level to log info or higher only
  level: "info",
  // Using the custom format for logging
  transports: [
    new winston.transports.Console({
      level: "info",
      format: combine(
        // winston.format.colorize({ colors }),
        label({ label: "APP_BUILDER.SERVER" }),
        timestamp({ format: "YYYY-MM-DDTHH:mm:ss:ms" }),
        customFormat
      ),
    }),
  ],
  // Do not exit application in case of an error
  exitOnError: false,
});

// If environment is not production, then log all levels to the console as well
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "silly",
      format: winston.format.simple(),
    })
  );
}

export default logger;
