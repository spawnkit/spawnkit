import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icon } from "./hugeicons";

interface Props {
  className?: string;
  showName?: boolean;
}

export const LogoComp: React.FC<Props> = ({
  className,
  showName = true,
}): React.JSX.Element => {
  return (
    <Link href="/" className={cn("flex items-center gap-1", className)}>
      <Icon.ComputerTerminal01Icon className="size-5" />
      {showName && <p className="font-serif text-sm font-medium">spawnkit</p>}
    </Link>
  );
};
