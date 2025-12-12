import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isActivePath(path: string, pathname: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
}
