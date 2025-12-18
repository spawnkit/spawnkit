"use client";

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
import { Kit } from "@/lib/kits";
import Link from "next/link";

interface Props {
  kit: Kit;
}

const statusStyles = {
  pending: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  approved: "bg-primary/10 text-primary border-primary/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

export const KitCard: React.FC<Props> = ({ kit }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-card/50 hover:border-primary/50 hover:bg-card hover:glow-primary relative cursor-pointer gap-4 p-4 backdrop-blur-sm transition-all duration-300">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border">
              <AvatarFallback>CN</AvatarFallback>
              <AvatarImage
                src={kit.ownerAvatar ?? "https://github.com/ghost.png"}
              />
            </Avatar>

            <div className="flex flex-1 flex-col">
              <p className="line-clamp-1 text-sm font-medium">{kit.name}</p>
              {kit.owner && (
                <span className="text-muted-foreground text-xs font-normal">
                  by {kit.owner}
                </span>
              )}
            </div>

            <Badge
              variant={"secondary"}
              className={cn(statusStyles[kit.status])}
            >
              {kit.status}
            </Badge>
          </div>

          <pre className="text-muted-foreground rounded-lg font-sans text-sm leading-relaxed whitespace-pre-wrap">
            {kit.description}
          </pre>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {kit.stack.map((stack) => (
              <span
                key={stack}
                className="bg-secondary text-secondary-foreground border-border/50 rounded-full border px-3 py-1 text-xs font-medium"
              >
                {stack}
              </span>
            ))}
          </div>

          <div className="border-t pt-4">
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={(e) => e.stopPropagation()}
            >
              <span>{kit.votes}</span>
              <span>Upvote</span>
            </Button>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="size-11 border">
              <AvatarFallback>CN</AvatarFallback>
              <AvatarImage
                src={kit.ownerAvatar ?? "https://github.com/ghost.png"}
              />
            </Avatar>

            <div className="flex flex-1 flex-col gap-px">
              <DialogTitle className="line-clamp-1 text-sm font-medium">
                {kit.name}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs font-normal">
                by {kit.owner}
              </DialogDescription>
            </div>

            <Badge
              variant={"secondary"}
              className={cn(statusStyles[kit.status])}
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
            <p className="font-serif text-[11px] font-normal uppercase sm:text-xs">
              Tech Stacks
            </p>

            <div className="flex flex-wrap gap-2">
              {kit.stack.map((stack) => (
                <span
                  key={stack}
                  className="bg-secondary text-secondary-foreground border-border/50 rounded-full border px-3 py-1 text-xs font-medium"
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <pre className="bg-background dark:bg-card flex items-center gap-2 rounded-lg p-4 font-sans text-sm leading-relaxed font-medium whitespace-pre-wrap">
              {kit.stars !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Icons.StarIcon className="size-4" />
                  <span className="font-serif text-xs">
                    {kit.stars?.toLocaleString()} Stars
                  </span>
                </div>
              )}
              {kit.forks !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Icons.GitForkIcon className="size-4" />
                  <span className="font-serif text-xs">
                    {kit.stars?.toLocaleString()} Fork
                  </span>
                </div>
              )}
              {/* {kit.language && (
                <div className="flex items-center gap-1.5">
                  <span className="bg-primary h-3 w-3 rounded-full" />
                  <span className="text-muted-foreground">{kit.language}</span>
                </div>
              )} */}
              <div className="ml-auto flex items-center gap-1.5">
                <Icons.ArrowUp02Icon className="size-4" />
                <span className="font-serif text-xs">10 Votes</span>
              </div>
            </pre>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-serif text-[11px] font-normal uppercase sm:text-xs">
              Quick Installation
            </p>

            <pre className="bg-background dark:bg-card flex items-center gap-2 rounded-lg px-4 py-2.5 font-sans text-sm leading-relaxed font-medium whitespace-pre-wrap">
              <TbTerminal className="text-primary size-4.5" />
              <span
                className={cn(
                  "line-clamp-1 px-1",
                  isCopied && "bg-primary text-background",
                )}
              >
                npx spawnkit nextjs-starter
              </span>

              <Button
                size="icon-sm"
                variant={"ghost"}
                onClick={async () =>
                  await copyToClipboard("npx spawnkit nextjs-starter")
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
              href={{ pathname: kit.githubUrl }}
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
