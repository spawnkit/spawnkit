"use client";

import Link from "next/link";
import { TbMenu } from "react-icons/tb";
import { usePathname } from "next/navigation";

import { Logo } from "./logo";
import { Wrapper } from "./wrapper";
import { cn, isActivePath } from "@/lib/utils";
import { NAVIGATION_ROUTES } from "@/lib/constants";
import { ModeSwitcher } from "./mode-switcher";
import { Button, buttonVariants } from "@/ui/button";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 left-0 w-full backdrop-blur-lg">
      <nav className="h-20 w-full">
        <Wrapper className="size-full flex items-center gap-2">
          <Button size="icon-sm" variant={"secondary"} className="md:hidden">
            <TbMenu className="size-4" />
          </Button>
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 text-foreground",
              isActivePath(pathname, "/") && "text-primary"
            )}
          >
            <Logo
              className={cn(
                "size-6 stroke-foreground",
                isActivePath(pathname, "/") && "stroke-primary"
              )}
            />
            <p className="text-base font-medium font-mono">spawnkit</p>
          </Link>

          <div className="flex items-center gap-2 justify-end flex-1 ml-2">
            <ul className="hidden sm:flex items-center flex-1 gap-2">
              {NAVIGATION_ROUTES.map((route) => {
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
                    <span>{route.label}</span>
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
