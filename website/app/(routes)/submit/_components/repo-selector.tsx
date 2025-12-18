"use client";

import React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/ui/input-group";
import {
  fetchUserRepos,
  GitHubRepo,
  RepoValidation,
  validateGitHubUrl,
  getGithubUsernameById,
  extractGithubIdFromAvatar,
} from "@/lib/api/github.api";
import { Icons } from "hugeicons-proxy";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { Badge } from "@/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { useIsMobile } from "@/hooks/mobile";
import { authClient } from "@/lib/auth-client";

interface Props {
  value: string;
  onChange: (url: string) => void;
  onValidation: (validation: RepoValidation | null) => void;
  error?: string;
  disabled?: boolean;
}

export const RepoSelector: React.FC<Props> = ({
  value,
  onChange,
  onValidation,
  error,
  disabled,
}) => {
  const isMobile = useIsMobile();

  const [open, setOpen] = React.useState(false);
  const [repos, setRepos] = React.useState<GitHubRepo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [validating, setValidating] = React.useState(false);
  const [searchFilter, setSearchFilter] = React.useState<string>("");
  const [validation, setValidation] = React.useState<RepoValidation | null>(
    null,
  );

  const { data: session } = authClient.useSession();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const loadRepos = async () => {
      setLoading(true);
      try {
        if (!mounted) {
          return;
        }
        if (!session) {
          setRepos([]);
          return;
        }

        const id = extractGithubIdFromAvatar(session.user?.image);
        if (!id) {
          setRepos([]);
          return;
        }

        const login = await getGithubUsernameById(id);

        if (!login) {
          setRepos([]);
          return;
        }

        const userRepos = await fetchUserRepos(login);
        setRepos(userRepos);
      } finally {
        setLoading(false);
      }
    };

    void loadRepos();
  }, [session, mounted]);

  React.useEffect(() => {
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

  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  const handleSelectRepo = (repo: GitHubRepo) => {
    onChange(repo.html_url);
    setOpen(false);
    setSearchFilter("");
  };

  const getValidationIcon = () => {
    if (validating)
      return (
        <Icons.Loading03Icon className="text-muted-foreground h-4 w-4 animate-spin" />
      );
    if (!validation) return null;
    if (validation.isPrivate)
      return <Icons.Share02Icon className="text-destructive h-4 w-4" />;
    if (!validation.exists)
      return (
        <Icons.CancelCircleHalfDotIcon className="text-destructive h-4 w-4" />
      );
    return <Icons.CheckmarkSquare03Icon className="text-primary h-4 w-4" />;
  };

  return (
    <>
      <div className="inline-flex flex-col space-y-2">
        <InputGroup className="overflow-hidden rounded-xl md:h-12 md:px-0.5">
          {!disabled && (
            <InputGroupAddon>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <InputGroupButton
                    type="button"
                    onClick={() => setOpen(!open)}
                    disabled={disabled}
                    variant="secondary"
                    size="sm"
                  >
                    {loading ? (
                      <Icons.Loading03Icon className="h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.GitBranchIcon className="h-4 w-4" />
                    )}
                  </InputGroupButton>
                </PopoverTrigger>
                <PopoverContent
                  className="ml-6 w-80 overflow-hidden rounded-xl p-0 md:ml-0 md:w-96"
                  align={isMobile ? "center" : "start"}
                >
                  <Command className="p-0">
                    <CommandInput
                      placeholder="Search repositories..."
                      value={searchFilter}
                      onValueChange={(e) => setSearchFilter(e)}
                      className="disabled:cursor-not-allowed"
                      disabled={disabled}
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup className="p-2">
                        {filteredRepos.map((repo) => (
                          <CommandItem
                            key={repo.id}
                            value={`${repo.name} ${repo.description ?? ""}`}
                            onSelect={() => handleSelectRepo(repo)}
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
                                    <Badge
                                      variant="secondary"
                                      className="py-0 text-xs"
                                    >
                                      {repo.language}
                                    </Badge>
                                  )}
                                  <span className="text-muted-foreground flex items-center gap-0.5 text-xs">
                                    <Icons.StarIcon className="h-3 w-3" />
                                    {repo.stargazers_count}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </InputGroupAddon>
          )}
          <div className="relative flex-1">
            <InputGroupInput
              placeholder="https://github.com/username/repo"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className={`pr-10 pl-2! ${error || (validation && !validation.exists) || validation?.isPrivate ? "border-destructive" : validation?.exists && !validation.isPrivate ? "border-primary" : ""}`}
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
                <Icons.CheckmarkSquare03Icon className="h-3.5 w-3.5" />
                Repository verified: {validation.repo?.full_name}
              </>
            ) : (
              <>
                <Icons.CheckmarkSquare03Icon className="h-3.5 w-3.5" />
                {validation.error}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
