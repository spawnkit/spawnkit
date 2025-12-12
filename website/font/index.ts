import { cn } from "@/lib/utils";
import { Albert_Sans, Geist_Mono } from "next/font/google";

const geistSans = Albert_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const fontVariables = (className: string) =>
  cn(geistSans.variable, geistMono.variable, className);
