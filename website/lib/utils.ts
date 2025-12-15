import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isActivePath(path: string, pathname: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
}

export function generatePreset(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function sleep(duration = 1500): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, duration));
}
