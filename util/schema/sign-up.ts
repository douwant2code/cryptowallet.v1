import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name should at least be 1 characters" })
    .max(50, { message: "Names may not exceed 50 characters" }),
  email: z.string().email({ message: "Please enter your email address" }),
  password: z.string().min(8, { message: "Minimum 8 characters is required" }),
});
