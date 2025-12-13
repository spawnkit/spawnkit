const GITHUB_AUTH_KEY = "spawnkit_github_connected";
const GITHUB_USER_KEY = "spawnkit_github_user";
const ADMIN_USERS_KEY = "spawnkit_admin_users";

export interface GitHubUser {
  username: string;
  avatarUrl: string;
}

const DEFAULT_ADMIN = "thelastofinusa";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAdminUsers(): string[] {
  if (!isBrowser()) return [DEFAULT_ADMIN];

  const stored = localStorage.getItem(ADMIN_USERS_KEY);
  if (stored) {
    const users = JSON.parse(stored);
    if (!users.includes(DEFAULT_ADMIN)) {
      users.push(DEFAULT_ADMIN);
      localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(users));
    }
    return users;
  }

  const defaultAdmins = [DEFAULT_ADMIN];
  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(defaultAdmins));
  return defaultAdmins;
}

export function addAdminUser(username: string): void {
  if (!isBrowser()) return;

  const admins = getAdminUsers();
  if (!admins.includes(username)) {
    admins.push(username);
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(admins));
  }
}

export function removeAdminUser(username: string): boolean {
  if (!isBrowser()) return false;
  if (username === DEFAULT_ADMIN) return false;

  const admins = getAdminUsers();
  const filtered = admins.filter((u) => u !== username);
  localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(filtered));
  return true;
}

export function isAdmin(username: string): boolean {
  if (!isBrowser()) return false;
  return getAdminUsers().includes(username);
}

export function isGitHubConnected(): boolean {
  if (!isBrowser()) return false;
  return localStorage.getItem(GITHUB_AUTH_KEY) === "true";
}

export function getGitHubUser(): GitHubUser | null {
  if (!isBrowser()) return null;
  if (!isGitHubConnected()) return null;

  const stored = localStorage.getItem(GITHUB_USER_KEY);
  if (stored) return JSON.parse(stored);
  return null;
}

export function connectGitHub(username: string): GitHubUser {
  if (!isBrowser()) {
    return {
      username,
      avatarUrl: `https://github.com/${username}.png`,
    };
  }

  localStorage.setItem(GITHUB_AUTH_KEY, "true");

  const user: GitHubUser = {
    username,
    avatarUrl: `https://github.com/${username}.png`,
  };

  localStorage.setItem(GITHUB_USER_KEY, JSON.stringify(user));
  return user;
}

export function disconnectGitHub(): void {
  if (!isBrowser()) return;

  localStorage.removeItem(GITHUB_AUTH_KEY);
  localStorage.removeItem(GITHUB_USER_KEY);
}

export function isCurrentUserAdmin(): boolean {
  if (!isBrowser()) return false;

  const user = getGitHubUser();
  if (!user) return false;
  return isAdmin(user.username);
}
