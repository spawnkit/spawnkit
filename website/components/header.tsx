"use client";

import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";

import { Wrapper } from "./wrapper";
import { LogoComp } from "./logo";
import { ModeSwitcher } from "./mode-switcher";
import { NAVIGATION_ROUTES } from "@/constants";
import { Button, buttonVariants } from "@/ui/button";
import { cn, isActivePath } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Icon } from "./hugeicons";
import { Separator } from "@/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";

export const Header = () => {
  const pathname = usePathname();

  const [authenticated, setAuthenticated] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isSmall, setIsSmall] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    function onScroll() {
      setIsSmall(window.scrollY > 700);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="bg-background dark:bg-background/80 sticky top-0 left-0 z-50 backdrop-blur-lg sm:dark:bg-transparent sm:dark:backdrop-blur-none">
      <nav className="flex h-18 w-full items-center md:h-20">
        <Wrapper
          size={isSmall ? "sm" : "default"}
          className="flex items-center gap-3 transition-all duration-500 ease-out sm:gap-4"
        >
          <LogoComp className="rounded-[8px] backdrop-blur-lg" />
          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="md:bg-card/60 hidden flex-1 items-center gap-1 rounded-full sm:flex md:p-2 md:backdrop-blur-lg">
              {NAVIGATION_ROUTES.map((route) => {
                const isActive = isActivePath(pathname, route.path);

                return (
                  <Link
                    key={route.path}
                    href={{ pathname: route.path }}
                    target={
                      route.path.startsWith("https://") ? "_blank" : "_self"
                    }
                    className={buttonVariants({
                      size: "sm",
                      variant: isActive ? "secondary" : "ghost",
                      className: "last-of-type:ml-auto md:rounded-full!",
                    })}
                  >
                    {route.icon && <route.icon className="size-4" />}
                    <span>{route.label}</span>
                  </Link>
                );
              })}
            </div>

            {isMounted && (
              <React.Fragment>
                <ModeSwitcher />

                {authenticated ? (
                  <Avatar
                    onClick={() => setAuthenticated(!authenticated)}
                    className="cursor-pointer border"
                  >
                    <AvatarFallback>AS</AvatarFallback>
                    <AvatarImage src="https://github.com/ghost.png" />
                  </Avatar>
                ) : (
                  <Button
                    size="sm"
                    variant={"outline"}
                    onClick={() => setAuthenticated(!authenticated)}
                    className="backdrop-blur-lg"
                  >
                    Sign In
                  </Button>
                )}

                <Separator
                  orientation="vertical"
                  className="mx-2 h-4! sm:hidden"
                />

                <Sheet>
                  <SheetTrigger asChild className="sm:hidden">
                    <Button size="icon-sm" variant={"secondary"}>
                      <Icon.Menu09Icon />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className="font-serif text-xs font-normal uppercase">
                        Navigation Menu
                      </SheetTitle>
                      <SheetDescription />
                    </SheetHeader>
                    <div className="grid flex-1 auto-rows-min px-4">
                      {NAVIGATION_ROUTES.map((route) => {
                        return (
                          <SheetClose key={route.path} asChild>
                            <Link
                              href={{ pathname: route.path }}
                              target={
                                route.path.startsWith("https://")
                                  ? "_blank"
                                  : "_self"
                              }
                              className={cn(
                                "inline-flex items-center gap-x-2.5 border-b p-3 last-of-type:mt-auto last-of-type:border-b-0",
                              )}
                            >
                              {route.icon && <route.icon className="size-4" />}
                              <span>{route.label}</span>
                            </Link>
                          </SheetClose>
                        );
                      })}
                    </div>
                  </SheetContent>
                </Sheet>
              </React.Fragment>
            )}
          </div>
        </Wrapper>
      </nav>
    </header>
  );
};
