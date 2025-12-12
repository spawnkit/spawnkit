#!/usr/bin/env node

import fs from "fs";
import path from "path";
import chalk from "chalk";
import degit from "degit";
import { execa } from "execa";
import prompts from "prompts";
import whichPMRuns from "which-pm-runs";
import { createSpinner } from "nanospinner";

import { ChoicesType } from "@/lib/choices";
import { loadChoices } from "@/lib/loadChoices";
import { language, Mode, ModeText } from "@/lib/language";
import { handleTemplateRepo, validateProjectName } from "@/lib/utils";

const pm: string = whichPMRuns()?.name || "npm";

async function main() {
  // FIRST prompt — cannot use modeText yet
  const { mode }: { mode: Mode } = await prompts({
    type: "select",
    name: "mode",
    message: "Pick your language style:",
    choices: [
      { title: "Default - clean & professional", value: "default" },
      { title: "Gen Z - unhinged & cooked", value: "genz" },
      { title: "Shakespeare - thee & thou maxxing", value: "shakespeare" },
    ],
  });

  // This determines ALL wording in the CLI
  const modeText: ModeText = language[mode];

  const loadingSpinner = createSpinner(chalk.yellow(modeText.wait)).start();

  try {
    const choices: ChoicesType[] = await loadChoices();

    if (choices.length === 0) {
      loadingSpinner.error({
        text: chalk.red(modeText.presetMissing),
      });
      process.exit(1);
    }

    loadingSpinner.stop();

    const {
      preset,
      projectName,
    }: {
      preset: ChoicesType["preset"];
      projectName: string;
    } = await prompts([
      {
        type: "select",
        name: "preset",
        message: modeText.promptPreset,
        choices: choices.map((c) => ({
          title: c.title,
          value: c.preset,
        })),
      },
      {
        type: "text",
        name: "projectName",
        message: modeText.promptProjectName,
        initial: "my-dapp",
        validate: (v) => v.trim().length > 0 || "Name required",
      },
    ]);

    const finalProjectName = await validateProjectName(projectName, mode);
    const target = path.resolve(process.cwd(), finalProjectName);

    fs.mkdirSync(target);

    console.log(chalk.cyan(`\n${modeText.cooking} "${finalProjectName}"...\n`));

    const templateRepo = await handleTemplateRepo(preset, modeText);

    // === TEMPLATE DOWNLOAD ===
    const downloadSpinner = createSpinner(
      chalk.magenta(modeText.fetching)
    ).start();
    const repo = degit(templateRepo);

    try {
      await repo.clone(target);
      downloadSpinner.success({
        text: chalk.green(modeText.templateOk),
      });
    } catch {
      downloadSpinner.error({
        text: chalk.red(modeText.templateFail),
      });
      process.exit(1);
    }

    // === INSTALL DEPS ===
    const installSpinner = createSpinner(
      chalk.yellow(`${modeText.installStart} using ${pm}...\n`)
    ).start();

    try {
      await execa(pm, ["install"], {
        cwd: target,
        stdio: "inherit",
      });

      installSpinner.success({
        text: chalk.green(modeText.installOk),
      });
    } catch {
      installSpinner.error({
        text: chalk.red(`\n${modeText.installFail}`),
      });
      process.exit(1);
    }

    const selectedChoice = choices.find((c) => c.preset === preset);

    if (!selectedChoice) {
      console.log(chalk.red("Selected preset not found."));
      process.exit(1);
    }

    // Use the after array if it exists, otherwise fallback
    const afterCommands = [
      `cd ${finalProjectName}`,
      selectedChoice.after?.length && selectedChoice.after,
    ];

    console.log(chalk.green(`\n${modeText.done}`));
    for (const cmd of afterCommands) {
      console.log(chalk.cyan(`  ${cmd}`));
    }
  } catch (err) {
    console.error(chalk.red(`\n${modeText.installFail}`));
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "init") {
  main();
} else {
  console.log(chalk.red(`Unknown command: ${args[0]}`));
  console.log(chalk.cyan(`Usage: spawnkit [init]`));
  process.exit(1);
}
