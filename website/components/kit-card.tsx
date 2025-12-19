"use client";

import * as React from "react";
import { TbCopy, TbCopyCheckFilled, TbTerminal } from "react-icons/tb";

import { Badge } from "@/ui/badge";
import { Card } from "@/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button, buttonVariants } from "@/ui/button";
import { useCopyToClipboard } from "@/hooks/copyToClipboard";
import { cn } from "@/lib/utils";
import { Icons } from "hugeicons-proxy";
import Link from "next/link";
import { QueryKitsResult } from "@/sanity.types";

interface Props {
  kit: QueryKitsResult[number];
}

const statusStyles = {
  pending: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  approved: "bg-primary/10 text-primary border-primary/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

export const KitCard: React.FC<Props> = ({ kit }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [stars, setStars] = React.useState<number | null>(null);
  const [forks, setForks] = React.useState<number | null>(null);
  const [languages, setLanguages] = React.useState<string[]>([]);

  const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Solidity: "#363636",
    Python: "#3572A5",
    Go: "#00ADD8",
    Rust: "#dea584",
    "C++": "#f34b7d",
    C: "#555555",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
  };

  const getLanguageColor = (lang: string): string =>
    LANGUAGE_COLORS[lang] || "var(--secondary)";

  React.useEffect(() => {
    const loadRepoMeta = async () => {
      try {
        const match = kit.repo?.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) return;
        const [, owner, repo] = match;
        const repoName = repo.replace(/\.git$/, "");

        const [repoRes, langRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${owner}/${repoName}`, {
            method: "GET",
          }),
          fetch(`https://api.github.com/repos/${owner}/${repoName}/languages`, {
            method: "GET",
          }),
        ]);

        if (repoRes.ok) {
          const repoData = (await repoRes.json()) as {
            stargazers_count?: number;
            forks_count?: number;
          };
          setStars(repoData.stargazers_count ?? null);
          setForks(repoData.forks_count ?? null);
        }

        if (langRes.ok) {
          const langObj = (await langRes.json()) as Record<string, number>;
          const langs = Object.keys(langObj);
          setLanguages(langs);
        }
      } catch {
        /* noop */
      }
    };

    void loadRepoMeta();
  }, [kit.repo]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-card/50 hover:border-primary/50 hover:bg-card hover:glow-primary relative mb-6 h-max cursor-pointer break-inside-avoid gap-4 p-4 backdrop-blur-sm transition-all duration-300">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border">
              <AvatarFallback>CN</AvatarFallback>
              <AvatarImage
                src={kit.owner?.avatarUrl ?? "https://github.com/ghost.png"}
              />
            </Avatar>

            <div className="flex flex-1 flex-col">
              <p className="line-clamp-1 text-sm font-medium">{kit.name}</p>
              {kit.owner && (
                <span className="text-muted-foreground text-xs font-normal">
                  by {kit.owner?.username}
                </span>
              )}
            </div>

            <Badge
              variant={"secondary"}
              className={cn(
                statusStyles[kit.status as keyof typeof statusStyles],
              )}
            >
              {kit.status}
            </Badge>
          </div>

          <pre className="text-foreground bg-card dark:bg-background rounded-lg p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">
            {kit.description}
          </pre>

          {/* Languages */}
          {languages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <div key={lang} className="flex items-center gap-1.5">
                  <span
                    className="bg-secondary size-3 rounded-full border"
                    style={{ backgroundColor: getLanguageColor(lang) }}
                  />
                  <p className="text-xs font-medium">{lang}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border">
              <AvatarFallback>CN</AvatarFallback>
              <AvatarImage
                src={kit.owner?.avatarUrl ?? "https://github.com/ghost.png"}
              />
            </Avatar>

            <div className="flex flex-1 flex-col gap-px">
              <DialogTitle className="line-clamp-1 text-sm font-medium">
                {kit.name}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs font-normal">
                by {kit.owner?.username}
              </DialogDescription>
            </div>

            <Badge
              variant={"secondary"}
              className={cn(
                statusStyles[kit.status as keyof typeof statusStyles],
              )}
            >
              {kit.status}
            </Badge>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <pre className="text-foreground bg-background dark:bg-card rounded-lg p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">
            {kit.description}
          </pre>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-3">
              {languages.length > 0 ? (
                languages.map((lang) => (
                  <div key={lang} className="flex items-center gap-1.5">
                    <span
                      className="bg-secondary size-3 rounded-full border"
                      style={{ backgroundColor: getLanguageColor(lang) }}
                    />
                    <p className="text-xs font-medium">{lang}</p>
                  </div>
                ))
              ) : (
                <span className="text-muted-foreground text-sm">—</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <pre className="bg-background dark:bg-card flex items-center gap-2 rounded-lg p-4 font-sans text-sm leading-relaxed font-medium whitespace-pre-wrap">
              <div className="flex items-center gap-1.5">
                <Icons.StarIcon className="size-4" />
                <span className="font-serif text-xs">
                  {stars !== null ? `${stars} Stars` : "—"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Icons.GitForkIcon className="size-4" />
                <span className="font-serif text-xs">
                  {forks !== null ? `${forks} Forks` : "—"}
                </span>
              </div>

              <div className="ml-auto flex items-center gap-1.5">
                <Icons.ArrowUp02Icon className="size-4" />
                <span className="font-serif text-xs">{kit.votes} Votes</span>
              </div>
            </pre>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-serif text-[11px] font-normal uppercase sm:text-xs">
              Quick Installation
            </p>

            <pre className="bg-background dark:bg-card flex items-center gap-2 rounded-lg px-4 py-2.5 font-sans text-sm leading-relaxed font-medium whitespace-pre-wrap">
              <TbTerminal className="text-primary size-4.5 shrink-0" />
              <span
                className={cn(
                  "line-clamp-1 px-1",
                  isCopied && "bg-primary text-background",
                )}
              >
                npx spawnkit {kit.preset}
              </span>

              <Button
                size="icon-sm"
                variant={"ghost"}
                onClick={async () =>
                  await copyToClipboard(`npx spawnkit ${kit.preset}`)
                }
                aria-label="Copy command"
                className="-mr-1 ml-auto"
              >
                {isCopied ? (
                  <TbCopyCheckFilled className="text-primary size-4" />
                ) : (
                  <TbCopy className="size-4" />
                )}
              </Button>
            </pre>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Link
              target="_blank"
              href={{ pathname: kit.repo }}
              className={buttonVariants({
                className: "mx-auto h-12 w-[90%] rounded-full!",
                size: "lg",
              })}
            >
              <Icons.GithubIcon />
              <span>View Repository</span>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
