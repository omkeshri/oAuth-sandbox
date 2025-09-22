// middleware/logger.js
const logger = (req, res, next) => {
  const start = Date.now();

  // When response finishes, log details
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} --> ${res.statusCode} [${duration}ms]`
    );
  });

  next();
};

module.exports = logger;
