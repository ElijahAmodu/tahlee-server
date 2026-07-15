import { z } from "zod";

export const signupSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 6 characters long"),
  name: z.string().min(1, "Name is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;
