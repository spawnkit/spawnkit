import fs from "fs";
import path from "path";
import chalk from "chalk";
import prompts from "prompts";
import { language, Mode, ModeText } from "./language";
import { ChoicesType } from "./choices";
import { createSpinner } from "nanospinner";
import { loadChoices } from "./loadChoices";

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
  const choicesArr: ChoicesType[] = await loadChoices();

  const presetChoice = choicesArr.find((c) => c.preset === preset);

  const presetSpinner = createSpinner(chalk.cyan(modeText.fetching)).start();

  if (!presetChoice) {
    presetSpinner.error({ text: chalk.red(modeText.presetMissing) });
    process.exit(1);
  }

  presetSpinner.stop();
  return presetChoice.repo;
}
