const winston = require("winston");

// Set up Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.txt" }),
  ],
});

module.exports = logger;
