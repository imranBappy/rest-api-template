// src/middleware/errorHandler.js
const { AppError } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  // If the error is not an instance of AppError, convert it to an InternalServerError
  if (!(err instanceof AppError)) {
    err = new AppError("An unexpected error occurred", 500);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = errorHandler;
