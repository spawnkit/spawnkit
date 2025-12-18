export const siteConfig = {
  title: "Spawnkit",
  tagline: "Stop Googling Starter Templates",
  description:
    "Spawn verified dApp starter projects instantly from curated templates. One command. Zero setup friction.",
  keywords: [
    "Next.js",
    "Starter Templates",
    "dApp Templates",
    "React",
    "Solidity",
    "Hardhat",
    "Foundry",
    "Wagmi",
  ],
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL_PROD,
};
