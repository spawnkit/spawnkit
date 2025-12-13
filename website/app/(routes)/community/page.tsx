"use client";

import { KitCard } from "@/components/kit-card";
import { Wrapper } from "@/components/wrapper";
import { GITHUB_USERNAME } from "@/lib/api/github.api";
import {
  connectGitHub,
  disconnectGitHub,
  getGitHubUser,
  GitHubUser,
  isCurrentUserAdmin,
  isGitHubConnected,
} from "@/lib/auth/github.auth";
import { getKits, getUserVotes, Kit, voteForKit } from "@/lib/kits-data";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  Filter,
  LogOut,
  PlusCircle,
  Search,
  Shield,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { LuGithub } from "react-icons/lu";
import { toast } from "sonner";

type FilterStatus = "all" | "pending" | "approved" | "rejected";

export default function Community() {
  const [kits, setKits] = React.useState<Kit[]>([]);
  const [userVotes, setUserVotes] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<FilterStatus>("all");
  const [githubConnected, setGithubConnected] = React.useState(false);
  const [githubUser, setGithubUser] = React.useState<GitHubUser | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    setKits(getKits());
    setUserVotes(getUserVotes());
    setGithubConnected(isGitHubConnected());
    setGithubUser(getGitHubUser());
    setIsAdmin(isCurrentUserAdmin());
  }, []);

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

  const handleVote = (kitId: string) => {
    if (!githubConnected) {
      handleConnectGitHub();
      return;
    }
    const updatedKit = voteForKit(kitId);
    if (updatedKit) {
      setKits(getKits());
      setUserVotes(getUserVotes());
      toast("Vote recorded!", {
        description: `You voted for ${updatedKit.name}`,
      });
    }
  };

  const filteredKits = kits
    .filter((kit) => {
      if (filterStatus !== "all" && kit.status !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          kit.name.toLowerCase().includes(query) ||
          kit.description.toLowerCase().includes(query) ||
          kit.stack.some((tech) => tech.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="flex-1 overflow-x-clip py-16 md:py-32">
      <Wrapper>
        {/* Header */}
        <div className="relative mb-12">
          <div className="from-primary/5 to-primary/5 absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r via-transparent blur-3xl" />
          <div className="max-w-3xl py-8">
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="text-primary h-8 w-8" />
              <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-4xl font-bold md:text-5xl">
                Community Kits
              </h1>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl text-lg">
              Browse and vote on community-submitted starter templates.
              Top-voted kits get added to the CLI for everyone to use.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="gap-2">
                <Link href="/submit">
                  <PlusCircle className="h-4 w-4" />
                  Submit a Kit
                </Link>
              </Button>
              {githubConnected ? (
                <>
                  <Button
                    variant="outline"
                    className="gap-2"
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
                  {isAdmin && (
                    <Button asChild variant="secondary" className="gap-2">
                      <Link href="/admin">
                        <Shield className="h-4 w-4" />
                        Admin
                      </Link>
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleConnectGitHub}
                >
                  <LuGithub className="h-4 w-4" />
                  Connect GitHub to Vote
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card/50 border-border mb-8 flex flex-col gap-4 rounded-lg border p-4 backdrop-blur-sm sm:flex-row">
          <div className="relative max-w-md flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search templates, stacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background pl-10!"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="text-muted-foreground h-4 w-4" />
            {(["all", "approved", "pending", "rejected"] as FilterStatus[]).map(
              (status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="capitalize"
                >
                  {status}
                  {status !== "all" && (
                    <span className="ml-1.5 text-xs opacity-60">
                      ({kits.filter((k) => k.status === status).length})
                    </span>
                  )}
                </Button>
              ),
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Showing{" "}
            <span className="text-foreground font-medium">
              {filteredKits.length}
            </span>{" "}
            kits
          </p>
        </div>

        {/* Kits Grid */}
        {filteredKits.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredKits.map((kit) => (
              <KitCard
                key={kit.id}
                kit={kit}
                hasVoted={userVotes.includes(kit.id)}
                isGitHubConnected={githubConnected}
                onVote={handleVote}
                onConnectGitHub={handleConnectGitHub}
              />
            ))}
          </div>
        ) : (
          <div className="border-border bg-card/30 rounded-lg border border-dashed py-20 text-center">
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Search className="text-muted-foreground h-8 w-8" />
            </div>
            <p className="text-muted-foreground mb-4">
              No kits found matching your criteria.
            </p>
            <Button asChild variant="outline">
              <Link href="/submit">Submit the first kit</Link>
            </Button>
          </div>
        )}
      </Wrapper>
    </div>
  );
}
