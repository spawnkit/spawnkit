import { cn } from "@/lib/utils";
import { Baskervville, IBM_Plex_Mono, Nunito_Sans } from "next/font/google";

const fontSans = Nunito_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Baskervville({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fontSerif = IBM_Plex_Mono({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const fontVariables = (className: string) =>
  cn(fontSans.variable, fontMono.variable, fontSerif.variable, className);
