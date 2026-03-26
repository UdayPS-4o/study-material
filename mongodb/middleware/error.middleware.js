/**
 * ============================================================
 * MONGOOSE CONCEPT: Global Error Handling Middleware
 * ============================================================
 * Catches errors passed via next(err) from async route handlers.
 * Mongoose errors have specific names/codes we can check.
 */

const errorHandler = (err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field: ${field}`;
  }

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
