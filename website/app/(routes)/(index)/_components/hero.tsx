"use client";

import React from "react";
import { Button } from "@/ui/button";
import { Logo } from "@/components/logo";
import { Wrapper } from "@/components/wrapper";

export const Hero = () => {
  const [copied, setCopied] = React.useState(false);

  const cmd = "npx spawnkit@latest init";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-24 md:py-32 lg:py-52 flex items-center justify-center">
      <Wrapper>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-balance text-4xl sm:text-5xl font-bold md:text-6xl">
            Scaffolds dApps from curated templates
          </h1>

          <p className="mx-auto max-w-2xl text-pretty text-lg">
            Pick your vibe, choose a template, and start building. Spawnkit
            handles setup, installs dependencies, and gets you coding in
            seconds.
          </p>

          <div className="mx-auto max-w-md w-full">
            <div className="bg-background relative flex items-center gap-2 rounded-[calc(var(--radius)+0.5rem)] border pr-2 shadow shadow-zinc-950/5 has-[input:focus]:ring-2 has-[input:focus]:ring-muted">
              <Logo className="pointer-events-none size-5 ml-4" />

              <div className="h-12 flex items-center flex-1">
                <p
                  className={[
                    "font-mono text-sm px-1 rounded",
                    copied ? "bg-foreground text-background" : "",
                  ].join(" ")}
                >
                  {cmd}
                </p>
              </div>

              <div className="md:pr-1.5 lg:pr-0">
                <Button
                  size="sm"
                  className="rounded-(--radius)"
                  onClick={handleCopy}
                >
                  <span className="block">{copied ? "Copied" : "Copy"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
