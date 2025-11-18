export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        status: "failed",
        errors: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message
        }))
      });
    }

    // Backup in case some other error occurs
    return res.status(400).json({
      status: "failed",
      message: error.message || "Validation failed",
    });
  }
};
