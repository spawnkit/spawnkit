import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <svg
      fill="none"
      strokeWidth="2"
      className={cn("size-50", className)}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 7l5 5l-5 5"></path>
      <path d="M12 19l7 0"></path>
    </svg>
  );
};
