import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const todoCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(1000, "Description too long").optional(),
});

export function zodFieldErrors(err: unknown) {
  const result: Record<string, string> = {};
  if (err && typeof err === "object" && "issues" in err) {
    // ZodError
    // @ts-ignore
    for (const issue of err.issues ?? []) {
      const key = issue.path?.[0];
      if (key && !result[String(key)]) {
        result[String(key)] = issue.message;
      }
    }
  }
  return result;
}
