import type { Metadata } from "next";

import "./globals.css";
import Provider from "./provider";
import { fontVariables } from "@/font";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  metadataBase: new URL(siteConfig.url as string),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "holiday",
      url: "https://linktr.ee/thelastofinusa",
    },
  ],
  creator: "thelastofinusa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: "@thelastofinusa",
  },
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVariables("flex min-h-dvh flex-col antialiased")}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
