"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/ui/button";
import { Icons } from "hugeicons-proxy";

export function ModeSwitcher() {
  const { setTheme, resolvedTheme, theme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const ThemeIcon = theme === "dark" ? Icons.Sun02Icon : Icons.MoonCloudIcon;

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggleTheme}
      title="Toggle theme"
    >
      <ThemeIcon className="size-4" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
