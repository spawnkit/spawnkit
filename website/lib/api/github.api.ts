const GITHUB_USERNAME = "github";

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

export async function fetchUserRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=public&sort=updated&per_page=100`,
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
      error: "Failed to validate repository",
    };
  }
}
