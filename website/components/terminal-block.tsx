"use client";

import * as React from "react";
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";

interface Props {
  command: string;
  className?: string;
}

export const TerminalBlock: React.FC<Props> = ({ command, className }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden border-2 border-border bg-card",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-destructive/60" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
        <div className="h-3 w-3 rounded-full bg-primary/60" />
        <span className="ml-2 text-xs text-muted-foreground font-mono">
          terminal
        </span>
      </div>

      {/* Terminal Content */}
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-primary font-mono">$</span>
          <code className="font-mono text-sm text-foreground whitespace-nowrap">
            {command}
          </code>
        </div>

        <Button
          variant={"ghost"}
          size={"icon-sm"}
          onClick={handleCopy}
          className="shrink-0 p-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Copy command"
        >
          {copied ? (
            <TbCopyCheckFilled className="size-4 text-primary" />
          ) : (
            <TbCopy className="size-4" />
          )}
        </Button>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5" />
      </div>
    </div>
  );
};
