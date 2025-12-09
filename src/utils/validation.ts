import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must be at most 100 characters"),
});

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must be at most 100 characters"),
});

export const todoCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(1000, "Description too long").optional().nullable(),
  completed: z.boolean().optional(),
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
