"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { Icon } from "@/components/hugeicons";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <Icon.CheckmarkSquare03Icon className="size-4" />,
        info: <Icon.AlertSquareIcon className="size-4" />,
        warning: <Icon.Alert02Icon className="size-4" />,
        error: <Icon.CancelSquareIcon className="size-4" />,
        loading: <Icon.Loading03Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
