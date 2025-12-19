import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z, ZodError } from "zod";

// Helper to get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Zod schema for validation ===
export const choicesSchema = z
  .object({
    title: z.string("Title is required.").min(1, "Title cannot be empty."),
    preset: z.string("Preset is required.").min(1, "Preset cannot be empty."),
    repo: z
      .url("Repo must be a valid URL")
      .refine(
        (val) => /^https?:\/\/github\.com\/.+\/.+$/.test(val),
        "Repo must be a valid GitHub repository URL, e.g., https://github.com/user/repo"
      ),
    after: z.array(z.string()).optional(),
  })
  .strict();

export type ChoicesType = z.infer<typeof choicesSchema>;

// === Helper to validate raw data ===
function validateChoices(data: unknown[]): ChoicesType[] {
  const results: ChoicesType[] = [];
  const errors: string[] = [];

  data.forEach((item, i) => {
    try {
      results.push(choicesSchema.parse(item));
    } catch (err) {
      if (err instanceof ZodError) {
        errors.push(
          `Entry #${i} invalid: ${err.issues
            .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
            .join("; ")}`
        );
      } else {
        errors.push(`Entry #${i} invalid: ${String(err)}`);
      }
    }
  });

  if (errors.length > 0) {
    throw new Error(`Choices validation failed:\n${errors.join("\n")}`);
  }

  return results;
}

/**
 * Fetch choices from either a local JSON file or a remote API URL.
 * @param source - Local path or API URL or preloaded array
 */
export async function queryChoices(
  source: string | unknown[]
): Promise<ChoicesType[]> {
  let data: unknown[];

  if (Array.isArray(source)) {
    data = source;
  } else if (
    (typeof source === "string" && source.startsWith("http://")) ||
    source.startsWith("https://")
  ) {
    const res = await fetch(source, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    data = (await res.json()) as unknown[];
  } else {
    // Local file relative to choices.ts
    const filePath = path.resolve(__dirname, source);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Local choices file not found: ${filePath}`);
    }
    data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as unknown[];
  }

  const normalized = (data as any[]).map((item) => {
    const out = { ...item };
    if (out.after === null || out.after === undefined) {
      delete out.after;
    } else if (typeof out.after === "string") {
      out.after = [out.after];
    } else if (Array.isArray(out.after)) {
      out.after = out.after.filter((x: unknown) => typeof x === "string");
      if (out.after.length === 0) delete out.after;
    } else {
      delete out.after;
    }
    return out;
  });

  return validateChoices(normalized);
}
