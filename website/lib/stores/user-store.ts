import { create } from "zustand";
import {
  extractGithubIdFromAvatar,
  getGithubUsernameById,
} from "@/lib/api/github.api";

type ConnectedUser = {
  id?: string;
  name?: string;
  username?: string;
  avatar?: string;
  githubId?: string;
};

type UserStore = {
  user: ConnectedUser | null;
  setUser: (user: ConnectedUser | null) => void;
  syncFromSession: (
    session: {
      user?: {
        id?: string;
        name?: string | null;
        username?: string | null;
        image?: string | null;
      };
    } | null,
  ) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  syncFromSession: async (session) => {
    if (session === null) {
      set({ user: null });
      return;
    }
    if (!session?.user) {
      return;
    }
    const avatar = session.user.image ?? undefined;
    const githubId = extractGithubIdFromAvatar(avatar) ?? undefined;
    let username: string | undefined = session.user.username ?? undefined;

    if (!username && githubId) {
      try {
        const login = await getGithubUsernameById(githubId);
        if (login) {
          username = login;
        }
      } catch {
        // ignore resolution errors
      }
    }

    set({
      user: {
        id: session.user.id,
        name: session.user.name ?? undefined,
        avatar,
        githubId,
        username,
      },
    });
  },
}));
