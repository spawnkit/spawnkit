/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as Hugeicon from "@hugeicons/react";
import * as CoreIcons from "@hugeicons/core-free-icons";

type BaseProps = React.ComponentProps<typeof Hugeicon.HugeiconsIcon>;
type IconProps = Omit<BaseProps, "icon">;

type IconComponent = (props: IconProps) => React.JSX.Element;

type IconMap = {
  [K in keyof typeof CoreIcons]: IconComponent;
};

export const Icon = new Proxy({} as IconMap, {
  get(_, iconName: string) {
    const iconDef = (CoreIcons as Record<string, any>)[iconName];
    if (!iconDef) return undefined;

    return (props: IconProps) => (
      <Hugeicon.HugeiconsIcon {...props} icon={iconDef} />
    );
  },
});
