# spawnkit

Spawnkit is a friendly, zero-config CLI that scaffolds modern dApp starter projects from curated templates — then installs dependencies and prints the “what to do next” commands. Pick your vibe, pick a preset, name your app, and you’re ready to build.

## Quick Start

- Use without installing:
  ```sh
  npx spawnkit@latest init
  ```
- Or install globally:
  ```sh
  npm install -g spawnkit@latest
  spawn init
  ```

## What It Does

- Prompts for a language style (“vibe”), a template preset, and a project folder name
- Downloads the chosen template via `degit` and creates the folder
- Detects your package manager automatically and installs dependencies
- Prints helpful follow-up commands (e.g. `cd <your-app>`, `npm run dev`)

Main entrypoint: `src/spawnkit.ts`

## Key Features

- Interactive flow with three language styles:
  - `default`: clean & professional
  - `genz`: playful slang responses
  - `shakespeare`: old-timey theatrical prompts
- Template presets from local JSON in development and from a remote source in production
- Strong Zod validation for template metadata (title, preset, repo URL, optional after-commands)
- Safe folder handling: override, rename, or cancel if the target already exists
- Auto-installs using your detected package manager (`npm`, `pnpm`, `yarn`, `bun`)

Template loading logic: `src/lib/loadChoices.ts`
Preset validation: `src/lib/choices.ts`

## Usage

```sh
spawnkit init
```

You’ll choose:

1. Language style (vibe)
2. Project preset
3. Project folder name

Example session:

```text
✔ Pick your language style: Default - clean & professional
✔ Choose your project setup: Next.js Boilerplate
✔ Enter a name for your project folder: my-dapp
```

## Available Templates

- Next.js Boilerplate — `src/choices.json`
  - Repo: https://github.com/spawnkit/nextjs-boilerplate

You can add more templates by extending `src/choices.json` (for development) or by serving a compatible JSON schema remotely for production.

## Development

- Run locally: `npm run dev`
- Build bundle: `npm run build`
- Watch build: `npm run watch:dev`
- Run tests: `npm run test`

## Publishing

- Build runs automatically before publish via `prepublishOnly`
- Publish helper: `npm run pubcli` (bumps patch version and publishes)
- Dry-run packing: `npm publish --dry-run`
