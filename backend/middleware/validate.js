module.exports = (schema) => {
  return (req, res, next) => {
    console.log("Incoming body:", req.body);

    const result = schema.safeParse(req.body);

    console.log(result);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;

    next();
  };
};