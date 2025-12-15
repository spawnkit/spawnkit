import Image from "next/image";

import { INIT_COMMAND } from "@/constants";
import { Wrapper } from "@/components/wrapper";
import { siteConfig } from "@/config/site.config";
import { TerminalBlock } from "@/components/terminal-block";

export const HeroComp = () => {
  return (
    <div className="py-16 sm:py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 isolate hidden contain-strict lg:block"
      >
        <div className="absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        <div className="absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <div className="relative">
        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>

        <Wrapper size="sm">
          <div className="mb-6 flex w-fit items-center gap-2 rounded-(--radius) border p-1 pr-3">
            <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 font-serif text-xs font-medium lowercase">
              {siteConfig.title}
            </span>
            <span className="text-sm">Community-driven templates</span>
          </div>

          <h1 className="max-w-3xl font-mono text-4xl font-medium text-balance sm:text-5xl md:text-6xl lg:text-7xl lg:leading-20">
            Build and Ship{" "}
            <span className="scale-95 font-serif font-normal">10x</span> faster
            with{" "}
            <span className="text-primary font-mono italic">
              {siteConfig.title}.
            </span>
          </h1>
          <p className="mt-4 text-base text-pretty sm:mt-6 md:max-w-lg md:text-lg">
            {siteConfig.description}
          </p>

          <TerminalBlock command={INIT_COMMAND} className="mt-12 sm:max-w-md" />
        </Wrapper>

        <Wrapper>
          <div className="relative mt-12 -mr-56 overflow-hidden mask-b-from-55% px-2 sm:mr-0 md:mt-20 lg:mt-32">
            <div className="ring-background bg-background relative overflow-hidden rounded-2xl border p-4 shadow-lg ring-1 inset-shadow-2xs shadow-zinc-950/15 sm:rounded-3xl md:rounded-4xl dark:inset-shadow-white/20">
              <Image
                className="bg-background relative hidden aspect-15/8 rounded-lg sm:rounded-xl md:rounded-2xl dark:block"
                src="/dark.png"
                alt="app screen"
                width="2700"
                height="1440"
                priority
                quality={100}
              />
              <Image
                className="border-border/25 relative z-2 aspect-15/8 rounded-lg border sm:rounded-xl md:rounded-2xl dark:hidden"
                src="/light.png"
                alt="app screen"
                width="2700"
                height="1440"
                priority
                quality={100}
              />
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};
