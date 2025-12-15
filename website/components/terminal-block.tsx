"use client";

import React from "react";
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";

import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/copyToClipboard";
import { Button } from "@/ui/button";

interface Props {
  command: string;
  className?: string;
}

export const TerminalBlock: React.FC<Props> = ({ className, command }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/30 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-destructive/60" />
        <div className="h-3 w-3 rounded-full bg-chart-4/60" />
        <div className="h-3 w-3 rounded-full bg-primary/60" />
        <span className="ml-3 text-xs text-muted-foreground font-serif">
          terminal
        </span>
      </div>

      {/* Terminal Content */}
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="text-primary font-serif font-medium mt-0.5">$</span>
          <code
            className={cn(
              "font-serif text-sm md:text-[15px] text-foreground whitespace-nowrap",
              isCopied && "bg-primary text-background"
            )}
          >
            {command}
          </code>
        </div>

        <Button
          size="icon-sm"
          variant={"ghost"}
          onClick={async () => await copyToClipboard(command)}
          aria-label="Copy command"
        >
          {isCopied ? (
            <TbCopyCheckFilled className="size-4.5 text-primary" />
          ) : (
            <TbCopy className="size-4.5" />
          )}
        </Button>
      </div>
    </div>
  );
};
