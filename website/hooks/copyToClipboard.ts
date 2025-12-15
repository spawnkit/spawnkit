import React from "react";

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = React.useState(false);

  async function copyToClipboard(value: string) {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch {
      setIsCopied(false);
    }
  }

  return { isCopied, copyToClipboard };
}
