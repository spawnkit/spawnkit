"use client";
import React from "react";
import Link from "next/link";

import { Wrapper } from "./wrapper";
import { navRoutes } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="border-t bg-white py-8 mt-24 dark:bg-transparent">
      <Wrapper>
        <div className="flex flex-wrap justify-between gap-6">
          <React.Suspense fallback="...">
            <DateComponent />
          </React.Suspense>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {navRoutes.map((route, index) => (
              <Link
                key={index}
                href={{ pathname: route.href }}
                target={route.href.startsWith("http") ? "_blank" : "_self"}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{route.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

const DateComponent = () => {
  return (
    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
      © {new Date().getFullYear()} Spawnkit. Built with Next.js and shadcn/ui.
    </span>
  );
};
