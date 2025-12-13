"use client";

import { useState, useEffect } from "react";
import { Input } from "@/ui/input";
import { Badge } from "@/ui/badge";
import { ScrollArea } from "@/ui/scroll-area";
import {
  GitBranch,
  Loader2,
  CheckCircle2,
  XCircle,
  Lock,
  Star,
  Search,
  Loader,
} from "lucide-react";
import {
  fetchUserRepos,
  validateGitHubUrl,
  GitHubRepo,
  RepoValidation,
} from "@/lib/api/github.api";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/ui/input-group";

interface RepoSelectorProps {
  value: string;
  onChange: (url: string) => void;
  onValidation: (validation: RepoValidation | null) => void;
  error?: string;
}

export const RepoSelector = ({
  value,
  onChange,
  onValidation,
  error,
}: RepoSelectorProps) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  const [validation, setValidation] = useState<RepoValidation | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    const loadRepos = async () => {
      setLoading(true);
      const userRepos = await fetchUserRepos();
      setRepos(userRepos);
      setLoading(false);
    };
    loadRepos();
  }, []);

  useEffect(() => {
    if (!value || !value.includes("github.com")) {
      onValidation(null);
      return;
    }

    const timer = setTimeout(async () => {
      setValidating(true);
      const result = await validateGitHubUrl(value);
      setValidation(result);
      onValidation(result);
      setValidating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, onValidation]);

  const handleSelectRepo = (repo: GitHubRepo) => {
    onChange(repo.html_url);
    setShowDropdown(false);
    setSearchFilter("");
  };

  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  const getValidationIcon = () => {
    if (validating)
      return <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />;
    if (!validation) return null;
    if (validation.isPrivate)
      return <Lock className="text-destructive h-4 w-4" />;
    if (!validation.exists)
      return <XCircle className="text-destructive h-4 w-4" />;
    return <CheckCircle2 className="text-primary h-4 w-4" />;
  };

  return (
    <div className="inline-flex flex-col space-y-2">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupButton
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowDropdown(!showDropdown)}
            className="gap-2 sm:-ml-1"
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <GitBranch className="h-4 w-4" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
        <div className="relative flex-1">
          <InputGroupInput
            placeholder="https://github.com/username/repo"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`pr-10 pl-3! ${error || (validation && !validation.exists) || validation?.isPrivate ? "border-destructive" : validation?.exists && !validation.isPrivate ? "border-primary" : ""}`}
          />
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            {getValidationIcon()}
          </div>
        </div>
      </InputGroup>

      {/* Validation Message */}
      {validation && (
        <div
          className={`flex items-center gap-1.5 text-sm ${validation.exists && !validation.isPrivate ? "text-primary" : "text-destructive"}`}
        >
          {validation.exists && !validation.isPrivate ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              Repository verified: {validation.repo?.full_name}
            </>
          ) : (
            <>
              <XCircle className="h-3.5 w-3.5" />
              {validation.error}
            </>
          )}
        </div>
      )}

      {/* Select from repos dropdown */}
      <div className="relative">
        {showDropdown && (
          <div className="bg-background border-border absolute top-full left-0 z-50 mt-2 w-full max-w-md border-2 shadow-lg">
            <div className="border-border border-b p-2">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search repositories..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-10!"
                />
              </div>
            </div>
            <ScrollArea className="h-64">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
                </div>
              ) : filteredRepos.length === 0 ? (
                <div className="text-muted-foreground py-8 text-center text-sm">
                  No repositories found
                </div>
              ) : (
                <div className="p-1">
                  {filteredRepos.map((repo) => (
                    <button
                      key={repo.id}
                      type="button"
                      onClick={() => handleSelectRepo(repo)}
                      className="hover:bg-muted/50 w-full p-3 text-left transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">
                            {repo.name}
                          </div>
                          {repo.description && (
                            <div className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                              {repo.description}
                            </div>
                          )}
                          <div className="mt-1.5 flex items-center gap-2">
                            {repo.language && (
                              <Badge variant="outline" className="py-0 text-xs">
                                {repo.language}
                              </Badge>
                            )}
                            <span className="text-muted-foreground flex items-center gap-0.5 text-xs">
                              <Star className="h-3 w-3" />
                              {repo.stargazers_count}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};
