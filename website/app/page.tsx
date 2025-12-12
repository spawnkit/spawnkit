import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="Spawnkit logo"
            width={30}
            height={20}
            priority
          />
          <p className="text-lg font-bold font-mono">spawnkit</p>
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl flex flex-col gap-2 tracking-tight">
            <span className="text-foreground font-semibold">
              Your Next.js project is ready.
            </span>{" "}
            <span className="text-2xl font-medium">
              Start building your app by editing{" "}
              <code className="text-xl font-mono">app/page.tsx.</code>
            </span>
          </h1>

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This starter includes <strong>Next.js App Router</strong>,{" "}
            <strong>Tailwind CSS</strong>, <strong>shadcn/ui</strong> and a
            clean project structure so you can ship faster.
          </p>

          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Check out the GitHub repo for updates, or read the docs to explore
            more templates and tools.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://github.com/spawnkit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/github.svg"
              alt="GitHub logomark"
              width={16}
              height={16}
            />
            GitHub
          </a>

          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://spawkdapp.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
