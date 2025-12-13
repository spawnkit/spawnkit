"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Wrapper } from "./wrapper";
import { NAVIGATION_ROUTES } from "@/lib/constants";
import { cn, isActivePath } from "@/lib/utils";

export const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="bg-card py-8">
      <Wrapper>
        <div className="flex flex-wrap justify-between gap-4 sm:gap-6">
          <React.Suspense fallback="...">
            <DateComponent />
          </React.Suspense>
          <div className="order-first flex flex-wrap justify-center gap-4 text-sm sm:gap-6 md:order-last">
            {NAVIGATION_ROUTES.map((route, index) => {
              const isActive = isActivePath(pathname, route.href);

              return (
                <Link
                  key={index}
                  href={{ pathname: route.href }}
                  target={route.href.startsWith("http") ? "_blank" : "_self"}
                  className={cn(
                    "block duration-150",
                    isActive
                      ? "text-primary hover:text-primary/80"
                      : "text-foreground",
                  )}
                >
                  <span>{route.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

const DateComponent = () => {
  return (
    <span className="text-foreground order-last block text-center text-sm md:order-first">
      © {new Date().getFullYear()} Spawnkit. Built with Next.js and shadcn/ui.
    </span>
  );
};
