#!/usr/bin/env node

import fs from "fs";
import path from "path";
import chalk from "chalk";
import degit from "degit";
import { execa } from "execa";
import prompts from "prompts";
import whichPMRuns from "which-pm-runs";
import { createSpinner } from "nanospinner";

import { ChoicesType, queryChoices } from "@/lib/choices";
import { language, Mode, ModeText } from "@/lib/language";
import {
  handleTemplateRepo,
  notifyIfOutdated,
  validateProjectName,
} from "@/lib/utils";
import { CHOICES_API_URL } from "./lib/constants";

const pm: string = whichPMRuns()?.name || "npm";

type MainOptions = {
  forcedPreset?: string;
  skipLanguage?: boolean;
  skipProjectName?: boolean;
};

async function main(options: MainOptions = {}) {
  const { forcedPreset, skipLanguage, skipProjectName } = options;

  await notifyIfOutdated(pm);

  let mode: Mode = "default";

  if (!skipLanguage) {
    const result = await prompts(
      {
        type: "select",
        name: "mode",
        message: language[mode].promptLanguage,
        choices: [
          { title: "Default - clean & professional", value: "default" },
          { title: "Gen Z - unhinged & cooked", value: "genz" },
          { title: "Shakespeare - thee & thou maxxing", value: "shakespeare" },
        ],
      },
      {
        onCancel: () => {
          console.log(chalk.yellow(language[mode].cancel));
          process.exit(0);
        },
      }
    );

    if (result?.mode) {
      mode = result.mode as Mode;
    }
  }

  const modeText: ModeText = language[mode];

  const loadingSpinner = createSpinner(chalk.yellow(modeText.wait)).start();
  let choices: ChoicesType[] = [];
  try {
    choices = await queryChoices(CHOICES_API_URL);
    if (choices.length === 0) {
      loadingSpinner.error({ text: chalk.red(modeText.presetMissing) });
      process.exit(1);
    }
    loadingSpinner.stop();
  } catch (e) {
    loadingSpinner.error({ text: chalk.red(modeText.fetchingFail) });
    process.exit(1);
  }

  const presetNames = choices.map((c) => c.preset);

  let preset: ChoicesType["preset"];
  let projectName: string;

  // === PRESET ===
  if (forcedPreset) {
    if (!presetNames.includes(forcedPreset)) {
      console.log(chalk.red(`${modeText.presetMissing}: ${forcedPreset}`));
      process.exit(1);
    }
    preset = forcedPreset;
  } else {
    const result = await prompts(
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
        onCancel: () => {
          console.log(chalk.yellow(modeText.cancel));
          process.exit(0);
        },
      }
    );

    preset = result.preset;
    if (!preset) {
      console.log(chalk.yellow(modeText.cancel));
      process.exit(0);
    }
  }

  // === PROJECT NAME ===
  if (skipProjectName) {
    projectName = preset;
  } else {
    const result = await prompts(
      {
        type: "text",
        name: "projectName",
        message: modeText.promptProjectName,
        initial: "spawned",
        validate: (v) => v.trim().length > 0 || modeText.promptProjectNameError,
      },
      {
        onCancel: () => {
          console.log(chalk.yellow(modeText.cancel));
          process.exit(0);
        },
      }
    );

    projectName = result.projectName;
    if (typeof projectName !== "string") {
      console.log(chalk.yellow(modeText.cancel));
      process.exit(0);
    }
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
  try {
    const rawArgs = process.argv.slice(2);
    const args = rawArgs.filter((a) => !a.startsWith("--"));

    const cmd = args[0];
    const presetArg = args[1];

    const isInit = cmd === "init";
    const isBare = !cmd || (isInit && !presetArg);
    const needsPresetCheck = Boolean(presetArg) || (!isInit && cmd);

    let presetNames: string[] = [];

    if (needsPresetCheck) {
      let choices: ChoicesType[];
      try {
        choices = await queryChoices(CHOICES_API_URL);
      } catch {
        console.log(chalk.red(language.default.fetchingFail));
        process.exit(1);
      }
      presetNames = choices.map((c) => c.preset);
    }

    // spawn
    if (isBare) {
      await main();
      process.exit(0);
    }

    // spawn <preset>
    if (!isInit && presetNames.includes(cmd)) {
      await main({ forcedPreset: cmd });
      process.exit(0);
    }

    // spawn init <preset>
    if (isInit && presetArg && presetNames.includes(presetArg)) {
      await main({
        forcedPreset: presetArg,
        skipLanguage: true,
        skipProjectName: true,
      });
      process.exit(0);
    }

    console.log(chalk.red(`Unknown command: ${rawArgs.join(" ")}`));
    console.log(chalk.cyan(`Usage:`));
    console.log(chalk.cyan(`  spawn`));
    console.log(chalk.cyan(`  spawn init`));
    console.log(chalk.cyan(`  spawn <preset>`));
    console.log(chalk.cyan(`  spawn init <preset>`));
    process.exit(1);
  } catch (err) {
    console.log(chalk.red("Unexpected error"));
    process.exit(1);
  }
})();
