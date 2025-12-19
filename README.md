# spawnkit

Spawnkit is a friendly, zero-config CLI that scaffolds modern dApp starter projects from curated templates — then installs dependencies and prints the “what to do next” commands. Pick your vibe, pick a preset, name your app, and you’re ready to build.

## Installation

- Use without installing:
  ```sh
  npx spawnkit@latest init
  ```
- Or install globally:

  ```sh
  npm install -g spawnkit@latest
  spawn init
  ```

You’ll choose:

1. Language style (vibe)
2. Project preset
3. Project folder name

Example session:

```text
✔ Pick your language style: Default - clean & professional
✔ Choose your project setup: Next.js + Hardhat Starter kit
✔ Enter a name for your project folder: spawned
```

## Usage

```sh
spawn
```

### Commands

- `spawn` — interactive mode
- `spawn init` — interactive mode
- `spawn <preset>` — non-interactive preset selection (still prompts for project name)
- `spawn init <preset>` — non-interactive preset selection and project name (`projectName = preset`)

## How It Works

- Pick a language style (“vibe”): `default`, `genz`, or `shakespeare`
- Pick a template preset
- Enter a project folder name
- Spawnkit downloads the template, installs dependencies, and prints the next commands (like `cd <your-app>` and `npm run dev`)

## What It Does

- Prompts for a language style (“vibe”), a template preset, and a project folder name
- Downloads the chosen template via `degit` and creates the folder
- Detects your package manager automatically and installs dependencies
- Prints helpful follow-up commands (e.g. `cd <your-app>`, `npm run dev`)

## Key Features

- Interactive flow with three language styles
- Validated presets and safe folder handling
- Auto-installs using your detected package manager

## Update Notifier

Spawnkit checks for new releases and shows a small banner if you’re out of date. The suggested update command adapts to your package manager.
