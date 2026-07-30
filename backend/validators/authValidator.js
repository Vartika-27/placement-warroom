const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must not exceed 30 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .lowercase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .lowercase(),
  password: z
    .string()
    .min(1, "Password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
