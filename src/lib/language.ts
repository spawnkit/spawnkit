export type Mode = "default" | "genz" | "shakespeare";

export type ModeText = {
  wait: string;
  cooking: string;
  templateOk: string;
  templateFail: string;
  installStart: string;
  installOk: string;
  installFail: string;
  done: string;
  fetching: string;
  fetchingFail: string;
  presetMissing: string;

  // Prompts
  promptLanguage: string;
  promptPreset: string;
  promptProjectName: string;
  promptProjectNameError: string;

  // New for utils.ts
  folderExists: string;
  folderNotEmpty: string;
  folderDelete: string;
  folderDeleteDone: string;
  renamePrompt: string;
  renameError: string;
  cancel: string;
};

export const language: Record<Mode, ModeText> = {
  default: {
    wait: "Please wait..",
    cooking: "Creating your project",
    templateOk: "Template downloaded successfully!",
    templateFail: "Template download failed.",
    installStart: "Installing dependencies",
    installOk: "Dependencies installed successfully!",
    installFail: "Failed to install dependencies.",
    done: "Setup complete!",
    fetching: "Fetching template..",
    fetchingFail: "Failed to load template list.",
    presetMissing: "Preset not found.",

    // Prompts
    promptLanguage: "Choose your language style:",
    promptPreset: "Choose your project setup:",
    promptProjectName: "Enter a name for your project folder:",
    promptProjectNameError: "Project name is required.",

    // Utils
    folderExists: "The folder already exists.",
    folderNotEmpty: "Folder is not empty.",
    folderDelete: "Override it (delete folder)",
    folderDeleteDone: "Deleted folder",
    renamePrompt: "Enter a new project name:",
    renameError: "Project name cannot be empty.",
    cancel: "Setup cancelled.",
  },
  genz: {
    wait: "One sec, it’s cooking 🔥",
    cooking: "Whipping up your project, no cap",
    templateOk: "Template just landed clean, sheesh",
    templateFail: "Template ate the fattest L rip",
    installStart: "Grabbing deps…",
    installOk: "Deps locked in, we eatin",
    installFail: "Install crashed out, actual pain",
    done: "All done king, go touch grass or code",
    fetching: "Pulling templates real quick",
    fetchingFail: "Templates ghosted us deadass",
    presetMissing: "That preset ain’t real bro",

    // Prompts
    promptLanguage: "What vibe we on today:",
    promptPreset: "What we building gang?",
    promptProjectName: "Drop a fire project name:",
    promptProjectNameError: "Nah fam you gotta type something",

    // Utils
    folderExists: "Folder already chilling here",
    folderNotEmpty: "Folder got stuff in it my guy",
    folderDelete: "Yeet the whole folder?",
    folderDeleteDone: "Folder got sent to the shadow realm",
    renamePrompt: "Hit me with a new name:",
    renameError: "Bro put SOMETHING I’m begging",
    cancel: "Aight bet, we out",
  },

  shakespeare: {
    wait: "Pray, tarry a moment...",
    cooking: "I conjure thy project from the ether!",
    templateOk: "The template hath arrived in triumph!",
    templateFail: "Alas, the template hath miserably failed.",
    installStart: "Summoning dependencies from distant realms",
    installOk: "The packages have been graciously installed!",
    installFail: "Woe! The installation hath been struck down!",
    done: "Thy project is complete — get thee to thy editor!",
    fetching: "Fetching the sacred templates...",
    fetchingFail: "The templates are lost unto the void.",
    presetMissing: "No such preset exists in these lands.",

    // Prompts
    promptLanguage: "In what tongue shall we speak, good soul?",
    promptPreset: "What manner of project dost thou seek?",
    promptProjectName: "Bestow a worthy name upon this work:",
    promptProjectNameError: "A name thou must give, else all is lost!",

    // Utils
    folderExists: "This folder already holds dominion here.",
    folderNotEmpty: "The directory is not empty, good sir.",
    folderDelete: "Shall I raze this folder to dust?",
    folderDeleteDone: "The folder hath been utterly banished.",
    renamePrompt: "Grant it a new name, I beseech thee:",
    renameError: "Thou must provide a name, or despair!",
    cancel: "Fare thee well — the rite is abandoned.",
  },
};
