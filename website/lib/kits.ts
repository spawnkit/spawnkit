export interface Kit {
  id: string;
  name: string;
  preset?: string;
  description: string;
  stack: string[];
  githubUrl: string;
  votes: number;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  stars?: number;
  forks?: number;
  language?: string;
  owner?: string;
  ownerAvatar?: string;
}

export const initialKits: Kit[] = [
  {
    id: "1",
    name: "Next.js + Wagmi Starter",
    description:
      "Full-featured Web3 starter with wallet connection, ENS resolution, and transaction hooks.",
    stack: ["Next.js", "Wagmi", "Viem", "Tailwind"],
    githubUrl: "https://github.com/example/nextjs-wagmi-starter",
    votes: 127,
    status: "approved",
    submittedAt: "2024-01-15",
    stars: 342,
    forks: 89,
    language: "TypeScript",
    owner: "thelastofinusa",
    ownerAvatar: "https://github.com/thelastofinusa.png",
  },
  {
    id: "2",
    name: "Hardhat + TypeScript Template",
    description:
      "Production-ready Hardhat setup with TypeScript, testing utilities, and deployment scripts.",
    stack: ["Hardhat", "TypeScript", "Ethers.js"],
    githubUrl: "https://github.com/example/hardhat-ts-template",
    votes: 98,
    status: "approved",
    submittedAt: "2024-01-20",
    stars: 256,
    forks: 67,
    language: "TypeScript",
    owner: "example",
    ownerAvatar: "https://github.com/ghost.png",
  },
  {
    id: "3",
    name: "React + RainbowKit",
    description:
      "Beautiful wallet connection UI with RainbowKit and customizable themes.",
    stack: ["React", "RainbowKit", "Wagmi", "shadcn/ui"],
    githubUrl: "https://github.com/example/react-rainbowkit",
    votes: 85,
    status: "approved",
    submittedAt: "2024-02-01",
    stars: 189,
    forks: 45,
    language: "TypeScript",
    owner: "example",
    ownerAvatar: "https://github.com/ghost.png",
  },
  {
    id: "4",
    name: "Foundry Monorepo",
    description:
      "Blazing fast smart contract development with Foundry and organized monorepo structure.",
    stack: ["Foundry", "Solidity", "Forge"],
    githubUrl: "https://github.com/example/foundry-monorepo",
    votes: 64,
    status: "pending",
    submittedAt: "2024-02-10",
    stars: 128,
    forks: 32,
    language: "Solidity",
    owner: "example",
    ownerAvatar: "https://github.com/ghost.png",
  },
  {
    id: "5",
    name: "Vite + Web3Modal",
    description:
      "Lightweight Vite starter with Web3Modal for seamless multi-chain wallet support.",
    stack: ["Vite", "Web3Modal", "TypeScript"],
    githubUrl: "https://github.com/example/vite-web3modal",
    votes: 52,
    status: "pending",
    submittedAt: "2024-02-15",
    stars: 94,
    forks: 21,
    language: "TypeScript",
    owner: "example",
    ownerAvatar: "https://github.com/ghost.png",
  },
  {
    id: "6",
    name: "Solana dApp Template",
    description:
      "Complete Solana development environment with Anchor, wallet adapters, and UI components.",
    stack: ["Solana", "Anchor", "React", "Tailwind"],
    githubUrl: "https://github.com/example/solana-dapp",
    votes: 41,
    status: "pending",
    submittedAt: "2024-02-20",
    stars: 76,
    forks: 18,
    language: "Rust",
    owner: "example",
    ownerAvatar: "https://github.com/ghost.png",
  },
];

const STORAGE_KEY = "spawnkit_kits";
const VOTES_KEY = "spawnkit_user_votes";

export function getKits(): Kit[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialKits));
  return initialKits;
}

export function saveKits(kits: Kit[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(kits));
}

export function getUserVotes(): string[] {
  const stored = localStorage.getItem(VOTES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveUserVote(kitId: string): void {
  const votes = getUserVotes();
  if (!votes.includes(kitId)) {
    votes.push(kitId);
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
  }
}

export function addKit(
  kit: Omit<Kit, "id" | "votes" | "status" | "submittedAt">,
): Kit {
  const kits = getKits();
  const newKit: Kit = {
    ...kit,
    id: Date.now().toString(),
    votes: 0,
    status: "pending",
    submittedAt: new Date().toISOString().split("T")[0],
  };
  kits.push(newKit);
  saveKits(kits);
  return newKit;
}

export function voteForKit(kitId: string): Kit | null {
  const kits = getKits();
  const kit = kits.find((k) => k.id === kitId);
  if (kit) {
    kit.votes += 1;
    saveKits(kits);
    saveUserVote(kitId);
    return kit;
  }
  return null;
}

export function updateKitStatus(
  kitId: string,
  status: Kit["status"],
): Kit | null {
  const kits = getKits();
  const kit = kits.find((k) => k.id === kitId);
  if (kit) {
    kit.status = status;
    saveKits(kits);
    return kit;
  }
  return null;
}

export function deleteKit(kitId: string): boolean {
  const kits = getKits();
  const filtered = kits.filter((k) => k.id !== kitId);
  if (filtered.length !== kits.length) {
    saveKits(filtered);
    return true;
  }
  return false;
}
