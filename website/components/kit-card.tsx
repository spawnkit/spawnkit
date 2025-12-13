import {
  ExternalLink,
  ArrowUp,
  Check,
  Github,
  Star,
  GitFork,
  Calendar,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Kit } from "@/lib/kits-data";
import { cn } from "@/lib/utils";

interface KitCardProps {
  kit: Kit;
  hasVoted: boolean;
  isGitHubConnected: boolean;
  onVote: (kitId: string) => void;
  onConnectGitHub: () => void;
}

const statusStyles = {
  pending: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  approved: "bg-primary/10 text-primary border-primary/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

export function KitCard({
  kit,
  hasVoted,
  isGitHubConnected,
  onVote,
  onConnectGitHub,
}: KitCardProps) {
  const handleVoteClick = () => {
    if (!isGitHubConnected) {
      onConnectGitHub();
      return;
    }
    if (!hasVoted) {
      onVote(kit.id);
    }
  };

  return (
    <div className="group border-border bg-card/50 hover:border-primary/50 hover:bg-card hover:glow-primary relative rounded-lg border p-6 backdrop-blur-sm transition-all duration-300">
      {/* Status Badge - Absolute positioned */}
      <Badge
        variant="outline"
        className={cn(
          "absolute top-4 right-4 text-xs capitalize",
          statusStyles[kit.status],
        )}
      >
        {kit.status}
      </Badge>

      {/* Header with Owner */}
      <div className="mb-4 flex items-center gap-2">
        {kit.ownerAvatar && (
          <img
            src={kit.ownerAvatar}
            alt={kit.owner}
            className="border-border h-10 w-10 rounded-full border"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-foreground truncate pr-20 text-base font-medium">
            {kit.name}
          </h3>
          {kit.owner && (
            <span className="text-muted-foreground -mt-3 text-sm">
              by {kit.owner}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
        {kit.description}
      </p>

      {/* GitHub Stats */}
      <div className="mb-4 flex items-center gap-4 text-sm">
        {kit.stars !== undefined && (
          <div className="text-muted-foreground flex items-center gap-1.5">
            <Star className="text-chart-4 h-4 w-4" />
            <span className="font-medium">{kit.stars.toLocaleString()}</span>
          </div>
        )}
        {kit.forks !== undefined && (
          <div className="text-muted-foreground flex items-center gap-1.5">
            <GitFork className="h-4 w-4" />
            <span>{kit.forks.toLocaleString()}</span>
          </div>
        )}
        {kit.language && (
          <div className="flex items-center gap-1.5">
            <span className="bg-primary h-3 w-3 rounded-full" />
            <span className="text-muted-foreground">{kit.language}</span>
          </div>
        )}
      </div>

      {/* Tech Stack */}
      <div className="mb-5 flex flex-wrap gap-2">
        {kit.stack.map((tech) => (
          <span
            key={tech}
            className="bg-secondary text-secondary-foreground border-border rounded border px-2.5 py-1 font-mono text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="border-border flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-3">
          <Button
            variant={hasVoted ? "default" : "outline"}
            size="sm"
            onClick={handleVoteClick}
            disabled={hasVoted}
            className={cn(
              "min-w-[80px] gap-2 font-mono",
              hasVoted && "opacity-70",
            )}
            title={!isGitHubConnected ? "Connect GitHub to vote" : undefined}
          >
            {hasVoted ? (
              <Check className="h-4 w-4" />
            ) : !isGitHubConnected ? (
              <Github className="h-4 w-4" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
            {kit.votes}
          </Button>

          <a
            href={kit.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-sm transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View Repo
          </a>
        </div>

        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Calendar className="h-3.5 w-3.5" />
          {kit.submittedAt}
        </div>
      </div>
    </div>
  );
}
