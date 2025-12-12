# spawnkit

The easiest way to bootstrap dApps.

## Installation

Global (recommended):

```sh
npm install -g spawnkit@latest
```

Or use without installation:

```sh
npx spawnkit@latest init
```

It is recommended to use the `@latest` version to ensure you have the latest features and bug fixes.

## Features

- Interactive project creation
- Three language **vibes**:

  - `default`: clean & professional
  - `genz`: unhinged & cooked
  - `shakespeare`: thee & thou maxxing

- Template presets loaded from:

  - local `choices.json` _(dev mode)_
  - remote API _(production mode)_

- Strong Zod validation

  - ensures template entries are correct
  - enforces **GitHub** repo pattern

- Auto project name validation

- Handles existing folders (`override`, `rename`, `cancel`)

- Auto-installs dependencies

- Supports after commands per preset (`cd <project>`, `pnpm run dev`)

## Usage

Run the CLI:

```sh
spawnkit init
```

You'll be prompted to choose:

1. Language style
2. Project preset
3. Project folder name

Example:

```code
✔ Pick your language style: Default - clean & professional
✔ Choose your project setup: Next.js with Hardhat
✔ Enter a name for your project folder: my-dapp
```

## Validation Rules

Each preset is validated via Zod:

- `title`: required, non-empty

- `preset`: required, non-empty

- `repo`: must be a valid GitHub URL

  - Example: `https://github.com/user/repo`

- `after`: optional list of shell commands

  - Presets can define custom after commands:

  ```json
  "after": [
    "cd my-dapp",
    "pnpm install",
    "pnpm run dev"
  ]
  ```

  - If omitted, `spawnkit` falls back to:

  ```sh
  cd my-dapp
  ```

Invalid entries will cause:

```code
Choices validation failed:
Entry #1 invalid: repo: Repo must be a valid GitHub repository URL
```

## Development

- Run locally: `npm run dev`
- Build bundle: `npm run build`
- Watch build: `npm run watch:dev`
- Run tests: `npm run test`

## Environment

- `src/lib/constants.ts` controls mode and remote presets:
  - `NODE_ENV`: `"dev"` uses local `src/choices.json`; `"prod"` fetches remote.
  - `CHOICES_API_URL`: remote JSON endpoint for presets in prod.

## Publishing

- Build runs automatically before publish via `prepublishOnly`.
- Use `npm run pubcli` to:
  - auto-increment the patch version
  - publish the package to npm
- Dry-run pack without uploading: `npm publish --dry-run`
