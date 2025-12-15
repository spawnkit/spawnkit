import { Icon } from "@/components/hugeicons";

export const INIT_COMMAND = "npx spawnkit@latest init";

export const NAVIGATION_ROUTES = [
  { label: "Community Kits", path: "/community" },
  { label: "Submit a Kit", path: "/submit" },
  // { label: "Admin", path: "/admin" },
  {
    label: "GitHub",
    path: "https://github.com/spawnkit",
    icon: Icon.GithubIcon,
  },
];

export const FEATURES = [
  {
    icon: Icon.ComputerTerminal01Icon,
    step: "01",
    title: "Run the CLI",
    description:
      "Execute npx spawnkit in your terminal to start the interactive wizard.",
  },
  {
    icon: Icon.Select01Icon,
    step: "02",
    title: "Choose your style",
    description:
      "Select your preferred language output and configuration options.",
  },
  {
    icon: Icon.LayoutGridIcon,
    step: "03",
    title: "Pick a template",
    description:
      "Browse community-voted, verified starter templates for your stack.",
  },
  {
    icon: Icon.Rocket01Icon,
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
