export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

export interface RepoValidation {
  exists: boolean;
  isPrivate: boolean;
  repo?: GitHubRepo;
  error?: string;
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?type=public&sort=updated&per_page=500`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos: GitHubRepo[] = await response.json();
    return repos.filter((repo) => !repo.private);
  } catch (error) {
    console.error("Error fetching repos:", error);
    return [];
  }
}

export async function validateGitHubUrl(url: string): Promise<RepoValidation> {
  // Extract owner/repo from URL
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);

  if (!match) {
    return {
      exists: false,
      isPrivate: false,
      error: "Invalid GitHub URL format",
    };
  }

  const [, owner, repo] = match;
  const repoName = repo.replace(/\.git$/, "");

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}`,
    );

    if (response.status === 404) {
      return {
        exists: false,
        isPrivate: false,
        error: "Repository not found or is private",
      };
    }

    if (!response.ok) {
      return {
        exists: false,
        isPrivate: false,
        error: "Failed to validate repository",
      };
    }

    const repoData: GitHubRepo = await response.json();

    if (repoData.private) {
      return {
        exists: true,
        isPrivate: true,
        repo: repoData,
        error: "Repository is private",
      };
    }

    return { exists: true, isPrivate: false, repo: repoData };
  } catch (error) {
    return {
      exists: false,
      isPrivate: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to validate repository",
    };
  }
}

/**
 * Extract GitHub numeric user id from a typical GitHub avatar URL
 * e.g. https://avatars.githubusercontent.com/u/1234567?v=4
 */
export function extractGithubIdFromAvatar(
  imageUrl?: string | null,
): string | null {
  if (!imageUrl) return null;
  const match = imageUrl.match(/\/u\/(\d+)/);
  return match?.[1] ?? null;
}

/**
 * Resolve GitHub login (username) from numeric user id using the undocumented
 * GitHub API endpoint https://api.github.com/user/:id
 * Returns the login or null if not found.
 */
export async function getGithubUsernameById(
  id: string | number,
): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/user/${id}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { login?: string };
    return data.login ?? null;
  } catch {
    return null;
  }
}
