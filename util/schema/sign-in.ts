import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: "Please enter your email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
