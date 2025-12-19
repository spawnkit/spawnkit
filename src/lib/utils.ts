import fs from "fs";
import path from "path";
import chalk from "chalk";
import prompts from "prompts";
import { language, Mode, ModeText } from "./language";
import { ChoicesType, queryChoices } from "./choices";
import { createSpinner } from "nanospinner";
import pkg from "../../package.json" assert { type: "json" };
import { CHOICES_API_URL } from "./constants";

export function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/^-+|-+$/g, "");
}

export async function validateProjectName(
  name: string,
  mode: Mode
): Promise<string> {
  const modeText: ModeText = language[mode];
  if (typeof name !== "string") {
    console.log(chalk.yellow(modeText.cancel));
    process.exit(0);
  }
  let slug = slugify(name);
  const target = path.resolve(process.cwd(), slug);

  // Prevent using current directory
  if (slug === "." || slug === "./") {
    console.log(chalk.red(modeText.folderNotEmpty));
    process.exit(1);
  }

  // If folder exists and is not empty -> ask options
  if (fs.existsSync(target) && fs.readdirSync(target).length > 0) {
    console.log(chalk.blue(`\n${modeText.folderExists}\n`));
    slug = await handleExistingFolder(slug, mode);
  }

  return slug;
}

export async function handleExistingFolder(
  projectName: string,
  mode: Mode
): Promise<string> {
  const modeText: ModeText = language[mode];
  const target: string = path.resolve(process.cwd(), projectName);

  if (!fs.existsSync(target)) return projectName;

  const response: prompts.Answers<"action"> = await prompts({
    type: "select",
    name: "action",
    message: modeText.folderNotEmpty,
    choices: [
      { title: modeText.folderDelete, value: "override" },
      { title: modeText.renamePrompt, value: "rename" },
      { title: modeText.cancel, value: "cancel" },
    ],
  });

  switch (response.action) {
    case "override":
      fs.rmSync(target, { recursive: true, force: true });
      console.log(chalk.red(`${modeText.folderDeleteDone} "${projectName}"`));
      return projectName;

    case "rename": {
      const newName: prompts.Answers<"newName"> = await prompts({
        type: "text",
        name: "newName",
        message: modeText.renamePrompt,
        validate: (v: string) =>
          v.trim().length > 0 ? true : modeText.renameError,
      });

      return handleExistingFolder(newName.newName, mode);
    }

    case "cancel":
    default:
      console.log(chalk.yellow(modeText.cancel));
      process.exit(0);
  }
}

export async function handleTemplateRepo(
  preset: ChoicesType["preset"],
  modeText: ModeText
): Promise<string> {
  const choicesArr: ChoicesType[] = await queryChoices(CHOICES_API_URL);

  const presetChoice = choicesArr.find((c) => c.preset === preset);

  const presetSpinner = createSpinner(chalk.cyan(modeText.fetching)).start();

  if (!presetChoice) {
    presetSpinner.error({ text: chalk.red(modeText.presetMissing) });
    process.exit(1);
  }

  presetSpinner.stop();
  return presetChoice.repo;
}

export function parseVersion(v: string): [number, number, number] {
  const parts = v.split(".");
  return [Number(parts[0]) || 0, Number(parts[1]) || 0, Number(parts[2]) || 0];
}

export function isOutdated(current: string, latest: string): boolean {
  const [c0, c1, c2] = parseVersion(current);
  const [l0, l1, l2] = parseVersion(latest);
  if (l0 !== c0) return l0 > c0;
  if (l1 !== c1) return l1 > c1;
  return l2 > c2;
}

export function updateCommand(pmName: string): string {
  switch (pmName) {
    case "pnpm":
      return "pnpm add -g spawnkit@latest";
    case "yarn":
      return "yarn global add spawnkit@latest";
    case "bun":
      return "bun add -g spawnkit@latest";
    default:
      return "npm i -g spawnkit@latest";
  }
}

export async function notifyIfOutdated(pm: string): Promise<void> {
  try {
    const res = await fetch("https://registry.npmjs.org/spawnkit/latest", {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return;
    const json = (await res.json()) as { version?: string };
    const latest = json.version || "";
    const current = pkg.version || "";
    if (latest && current && isOutdated(current, latest)) {
      const lines = [
        ` Update available ${current} → ${latest} `,
        ` Run ${updateCommand(pm)} to update `,
      ];
      const width = Math.max(...lines.map((l) => l.length)) + 2;
      const top = `╭${"─".repeat(width)}╮`;
      const bottom = `╰${"─".repeat(width)}╯`;
      const empty = `│${" ".repeat(width)}│`;
      const body = lines
        .map((l) => {
          const pad = width - l.length;
          return `│ ${chalk.yellow(l)}${" ".repeat(pad - 1)}│`;
        })
        .join("\n");
      console.log(
        chalk.cyanBright(`\n${top}\n${empty}\n${body}\n${empty}\n${bottom}\n`)
      );
    }
  } catch {
    // silent
  }
}
