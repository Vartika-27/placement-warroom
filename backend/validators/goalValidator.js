const { z } = require("zod");

const goalSchema = z.object({
  task: z
    .string()
    .trim()
    .min(1)
    .max(100),
});

module.exports = {
  goalSchema,
};