import { cn } from "@/lib/utils";
import { Fira_Mono, Fira_Sans } from "next/font/google";

const geistSans = Fira_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Fira_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const fontVariables = (className: string) =>
  cn(geistSans.variable, geistMono.variable, className);
