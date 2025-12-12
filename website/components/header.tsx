"use client";

import Link from "next/link";
import { TbMenu } from "react-icons/tb";
import { usePathname } from "next/navigation";

import { Logo } from "./logo";
import { Wrapper } from "./wrapper";
import { isActivePath } from "@/lib/utils";
import { navRoutes } from "@/lib/constants";
import { ModeSwitcher } from "./mode-switcher";
import { Button, buttonVariants } from "@/ui/button";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 left-0 w-full bg-background/80 backdrop-blur-lg">
      <nav className="h-20 w-full">
        <Wrapper className="size-full flex items-center gap-2">
          <Button size="icon-sm" variant={"secondary"} className="md:hidden">
            <TbMenu className="size-4" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-6" />
            <p className="text-base font-bold font-mono">spawnkit</p>
          </Link>

          <div className="flex items-center gap-2 justify-end flex-1 ml-2">
            <ul className="hidden sm:flex items-center flex-1 gap-2">
              {navRoutes.map((route) => {
                const isActive = isActivePath(pathname, route.href);

                return (
                  <Link
                    key={route.href}
                    href={{ pathname: route.href }}
                    target={route.href.startsWith("http") ? "_blank" : "_self"}
                    className={buttonVariants({
                      size: "sm",
                      variant: isActive ? "secondary" : "ghost",
                      className: "last-of-type:ml-auto",
                    })}
                  >
                    {route.icon && <route.icon className="size-4" />}
                    {route.label}
                  </Link>
                );
              })}
            </ul>

            <ModeSwitcher />
          </div>
        </Wrapper>
      </nav>
    </header>
  );
};
