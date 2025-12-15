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

type MainOptions = {
  forcedPreset?: string;
  skipLanguage?: boolean;
  skipProjectName?: boolean;
};

async function main(options: MainOptions = {}) {
  const { forcedPreset, skipLanguage, skipProjectName } = options;

  let mode: Mode = "default";

  if (!skipLanguage) {
    const result = await prompts({
      type: "select",
      name: "mode",
      message: "Pick your language style:",
      choices: [
        { title: "Default - clean & professional", value: "default" },
        { title: "Gen Z - unhinged & cooked", value: "genz" },
        { title: "Shakespeare - thee & thou maxxing", value: "shakespeare" },
      ],
    });

    mode = result.mode;
  }

  const modeText: ModeText = language[mode];

  const loadingSpinner = createSpinner(chalk.yellow(modeText.wait)).start();

  const choices: ChoicesType[] = await loadChoices();

  if (choices.length === 0) {
    loadingSpinner.error({
      text: chalk.red(modeText.presetMissing),
    });
    process.exit(1);
  }

  loadingSpinner.stop();

  const presetNames = choices.map((c) => c.preset);

  let preset: ChoicesType["preset"];
  let projectName: string;

  // === PRESET ===
  if (forcedPreset && presetNames.includes(forcedPreset)) {
    preset = forcedPreset;
  } else {
    const result = await prompts({
      type: "select",
      name: "preset",
      message: modeText.promptPreset,
      choices: choices.map((c) => ({
        title: c.title,
        value: c.preset,
      })),
    });

    preset = result.preset;
  }

  // === PROJECT NAME ===
  if (skipProjectName) {
    projectName = preset;
  } else {
    const result = await prompts({
      type: "text",
      name: "projectName",
      message: modeText.promptProjectName,
      initial: "spawned-dapp",
      validate: (v) => v.trim().length > 0 || modeText.promptProjectNameError,
    });

    projectName = result.projectName;
  }

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

  // === INSTALL ===
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

  const afterCommands: string[] = [`cd ${finalProjectName}`];

  if (selectedChoice?.after?.length) {
    afterCommands.push(...selectedChoice.after);
  }

  console.log(chalk.green(`\n${modeText.done}`));

  for (const cmd of afterCommands) {
    console.log(chalk.cyan(`  ${cmd}`));
  }
}

// === CLI ENTRY ===
(async () => {
  const args = process.argv.slice(2).filter((arg) => arg !== "--");

  const [cmd, maybePreset] = args;

  const choices = await loadChoices();
  const presetNames = choices.map((c) => c.preset);

  // spawnkit
  if (!cmd) {
    await main();
    return;
  }

  // spawnkit init
  if (cmd === "init" && !maybePreset) {
    await main();
    return;
  }

  // spawnkit <preset>
  if (presetNames.includes(cmd)) {
    await main({ forcedPreset: cmd });
    return;
  }

  // spawnkit init <preset>
  if (cmd === "init" && maybePreset && presetNames.includes(maybePreset)) {
    await main({
      forcedPreset: maybePreset,
      skipLanguage: true,
      skipProjectName: true,
    });
    return;
  }

  console.log(chalk.red(`Unknown command: ${args.join(" ")}`));
  console.log(chalk.cyan(`Usage:`));
  console.log(chalk.cyan(`  spawnkit`));
  console.log(chalk.cyan(`  spawnkit init`));
  console.log(chalk.cyan(`  spawnkit <preset>`));
  console.log(chalk.cyan(`  spawnkit init <preset>`));
  process.exit(1);
})();
