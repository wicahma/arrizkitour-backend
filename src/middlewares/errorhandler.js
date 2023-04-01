const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    type: err.name ? err.name : "Middleware Error!",
    message: err.message,
    stack: process.env.NODE_ENV === "production" && err.stack,
  });
};

module.exports = {
  errorHandler,
};
