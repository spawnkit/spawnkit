export type KitType = {
  title: string; // template name
  preset: string; // the slug for the template name, should populate by default
  repo: string; // github repo url
  after: string[]; // the commands to run after e.g. cd <project-name> && npm run dev or ["cd my-dapp", "npm run dev"]
  user: unknown; // should use the user type from github
  description: string; // describing the template
  stack: string[]; // tech stacks used
};

export type FilterStatus = "all" | "pending" | "approved" | "rejected";
