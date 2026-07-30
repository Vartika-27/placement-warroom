const { z } = require("zod");

const solvedQuestionSchema = z.object({

  title: z
    .string()
    .trim()
    .min(1)
    .max(200),

  topic: z
    .string()
    .trim()
    .min(1),

  difficulty: z.enum([
    "Easy",
    "Medium",
    "Hard",
  ]),

  platform: z
    .string()
    .default("LeetCode"),

  problemUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .optional(),
});

module.exports = {
  solvedQuestionSchema,
};