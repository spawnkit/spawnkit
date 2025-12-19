import z from "zod";

export const kitSchema = z.object({
  name: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  preset: z
    .string()
    .min(3, "Preset must be at least 3 characters")
    .max(50, "Preset must be less than 50 characters")
    .regex(/^[a-z0-9-]+$/, "Preset must be lowercase with hyphens only"),
  githubUrl: z
    .string("Repo URL is required")
    .refine((url) => url.includes("github.com"), "Must be a GitHub URL"),
  after: z.array(z.string()).optional(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(300, "Description must be less than 300 characters"),
});

export type KitFormData = z.infer<typeof kitSchema>;
