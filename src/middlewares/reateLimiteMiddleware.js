const rateLimit = require("express-rate-limit");
const defaultOption = {
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many  requests from this IP, please try again after 15 minutes",
};
const rateLimitMiddleware = (options = defaultOption) => {
  const limiter = rateLimit(options);
  return limiter;
};

module.exports = rateLimitMiddleware;
