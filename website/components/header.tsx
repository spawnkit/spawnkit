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
import {
  connectGitHub,
  disconnectGitHub,
  GitHubUser,
} from "@/lib/auth/github.auth";
import { GITHUB_USERNAME } from "@/lib/api/github.api";
import { toast } from "sonner";
import React from "react";
import { LogOut } from "lucide-react";

export const Header = () => {
  const pathname = usePathname();

  const [githubConnected, setGithubConnected] = React.useState(false);
  const [githubUser, setGithubUser] = React.useState<GitHubUser | null>(null);

  const handleConnectGitHub = () => {
    const user = connectGitHub(GITHUB_USERNAME);
    setGithubConnected(true);
    setGithubUser(user);
    toast.success("GitHub Connected!", {
      description: "You can now vote on community kits.",
    });
  };

  const handleDisconnectGitHub = () => {
    disconnectGitHub();
    setGithubConnected(false);
    setGithubUser(null);
    toast.success("GitHub Disconnected", {
      description: "Connect again to vote on kits.",
    });
  };

  return (
    <header className="sticky top-0 left-0 z-50 w-full backdrop-blur-md">
      <nav className="h-20 w-full md:h-24">
        <Wrapper className="flex size-full items-center gap-2">
          <Button size="icon-sm" variant={"secondary"} className="md:hidden">
            <TbMenu className="size-4" />
          </Button>
          <Link
            href="/"
            className={cn(
              "text-foreground flex items-center gap-2",
              isActivePath(pathname, "/") && "text-primary",
            )}
          >
            <Logo
              className={cn(
                "stroke-foreground size-6",
                isActivePath(pathname, "/") && "stroke-primary",
              )}
            />
            <p className="font-mono text-base font-medium">spawnkit</p>
          </Link>

          <div className="ml-2 flex flex-1 items-center justify-end gap-2">
            <ul className="hidden flex-1 items-center gap-2 sm:flex">
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

            {githubConnected ? (
              <Button
                variant="outline"
                className="gap-2"
                size="sm"
                onClick={handleDisconnectGitHub}
              >
                <img
                  src={githubUser?.avatarUrl}
                  alt=""
                  className="border-border h-5 w-5 rounded-full border"
                />
                {githubUser?.username}
                <LogOut className="ml-1 h-3 w-3 opacity-50" />
              </Button>
            ) : (
              <Button
                variant="outline"
                className="gap-2"
                size="sm"
                onClick={handleConnectGitHub}
              >
                Sign In
              </Button>
            )}
          </div>
        </Wrapper>
      </nav>
    </header>
  );
};
