import { VscGithubAlt } from "react-icons/vsc";
import { TbTerminal2 } from "react-icons/tb";
import { MdOutlineStyle } from "react-icons/md";
import { LuLayoutTemplate } from "react-icons/lu";
import { BiRocket } from "react-icons/bi";

export const INIT_COMMAND = "npx spawnkit@latest init";
export const GITHUB_API_URL = "https://api.github.com/repos";

export const NAVIGATION_ROUTES = [
  { href: "/docs", label: "Docs" },
  { href: "/community", label: "Community Kits" },
  { href: "/submit", label: "Submit a Kit" },
  { href: "https://github.com/spawnkit", label: "Github", icon: VscGithubAlt },
];

export const HOW_IT_WORKS = [
  {
    icon: TbTerminal2,
    step: "01",
    title: "Run the CLI",
    description:
      "Execute npx spawnkit in your terminal to start the interactive wizard.",
  },
  {
    icon: MdOutlineStyle,
    step: "02",
    title: "Choose your style",
    description:
      "Select your preferred language output and configuration options.",
  },
  {
    icon: LuLayoutTemplate,
    step: "03",
    title: "Pick a template",
    description:
      "Browse community-voted, verified starter templates for your stack.",
  },
  {
    icon: BiRocket,
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
