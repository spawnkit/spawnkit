import { Icons } from "hugeicons-proxy";

export const INIT_COMMAND = "npx spawnkit@latest init";

export const NAVIGATION_ROUTES = [
  { label: "Community Kits", path: "/community" },
  { label: "Submit a Kit", path: "/submit" },
  // { label: "Admin", path: "/admin" },
  {
    label: "GitHub",
    path: "https://github.com/spawnkit",
    icon: Icons.GithubIcon,
  },
];

export const FEATURES = [
  {
    icon: Icons.ComputerTerminal01Icon,
    step: "01",
    title: "Run the CLI",
    description:
      "Execute npx spawnkit in your terminal to start the interactive wizard.",
  },
  {
    icon: Icons.Select01Icon,
    step: "02",
    title: "Choose your style",
    description:
      "Select your preferred language output and configuration options.",
  },
  {
    icon: Icons.LayoutGridIcon,
    step: "03",
    title: "Pick a template",
    description:
      "Browse community-voted, verified starter templates for your stack.",
  },
  {
    icon: Icons.Rocket01Icon,
    step: "04",
    title: "Start building",
    description: "Your project is ready. No configuration needed—just code.",
  },
];

export const DEVELOPER_EXPERIENCE_FEATURES = [
  "CLI-first workflow",
  "Customizable language output",
  "Supports Next.js, Tailwind, shadcn",
  "Hardhat & Foundry templates",
  "No boilerplate hunting",
  "TypeScript by default",
];

export const AFTER_COMMANDS = ["npm install", "npm run dev"];
