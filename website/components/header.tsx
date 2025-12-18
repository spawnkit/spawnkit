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
import { Icons } from "hugeicons-proxy";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export const Header = () => {
  const pathname = usePathname();

  const [isMounted, setIsMounted] = React.useState(false);
  const [isSmall, setIsSmall] = React.useState(false);
  const { data: session } = authClient.useSession();

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

                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer border">
                        <AvatarFallback>
                          {session.user?.name?.slice(0, 2).toUpperCase() ||
                            "GH"}
                        </AvatarFallback>
                        <AvatarImage src={session.user?.image || ""} />
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>
                        {session.user?.name}
                      </DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          Profile
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => authClient.signOut()}>
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant={"outline"}
                        className="backdrop-blur-lg"
                      >
                        Sign In
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader className="text-center">
                        <div className="bg-primary/10 border-primary/20 mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl border">
                          <Icons.GithubIcon className="text-primary h-8 w-8" />
                        </div>
                        <DialogTitle className="text-xl">
                          Connect Your GitHub
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          To submit a template, you need to connect your GitHub
                          account. This allows us to verify your repositories
                          and display your profile.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="bg-secondary/50 space-y-3 rounded-lg px-5 py-4 text-sm">
                        <p className="font-medium">
                          By connecting, you&apos;ll be able to:
                        </p>
                        <ul className="text-muted-foreground space-y-1">
                          <li className="flex items-center gap-2">
                            <span className="bg-primary size-1.5 rounded-full" />
                            <span className="text-sm">
                              Select repositories from your account
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="bg-primary size-1.5 rounded-full" />
                            <span className="text-sm">
                              Submit templates for community review
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="bg-primary size-1.5 rounded-full" />
                            <span className="text-sm">
                              Vote on community templates
                            </span>
                          </li>
                        </ul>
                      </div>
                      <Button
                        type="button"
                        className="mt-4 w-full"
                        size="lg"
                        onClick={() =>
                          authClient.signIn.social({
                            /**
                             * The social provider ID
                             * @example "github", "google", "apple"
                             */
                            provider: "github",
                            /**
                             * A URL to redirect after the user authenticates with the provider
                             * @default "/"
                             */
                            callbackURL: "/community",
                            /**
                             * A URL to redirect if an error occurs during the sign in process
                             */
                            errorCallbackURL: "/",
                            /**
                             * A URL to redirect if the user is newly registered
                             */
                            newUserCallbackURL: "/submit",
                          })
                        }
                      >
                        Continue with GitHub
                      </Button>
                    </DialogContent>
                  </Dialog>
                )}

                <Separator
                  orientation="vertical"
                  className="mx-2 h-4! sm:hidden"
                />

                <Sheet>
                  <SheetTrigger asChild className="sm:hidden">
                    <Button size="icon-sm" variant={"secondary"}>
                      <Icons.Menu09Icon />
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
