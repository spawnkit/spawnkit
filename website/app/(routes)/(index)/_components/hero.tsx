/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { Wrapper } from "@/components/wrapper";
import { INIT_COMMAND } from "@/lib/constants";
import { Button, buttonVariants } from "@/ui/button";
import { TerminalBlock } from "@/components/terminal-block";

export const Hero = () => {
  return (
    <main className="overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 isolate hidden contain-strict lg:block"
      >
        <div className="absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        <div className="absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>
      <section>
        <div className="relative pt-12 md:pt-24">
          <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
          <div className="mx-auto max-w-5xl px-6">
            <div className="sm:mx-auto lg:mt-0 lg:mr-auto">
              <h1 className="mt-8 max-w-2xl text-4xl font-medium text-balance sm:text-5xl md:text-6xl lg:mt-16">
                Stop Googling{" "}
                <span className="text-primary">Start Templating</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg text-pretty">
                Spawn verified dApp templates instantly from your terminal. One
                command. Zero setup friction.
              </p>

              <TerminalBlock
                command={INIT_COMMAND}
                className="my-10 max-w-md"
              />

              <div className="mt-12 flex items-center gap-2">
                <Button asChild size="lg">
                  <span className="text-nowrap">Get Started</span>
                </Button>
                <Link
                  href="/community"
                  className={buttonVariants({
                    size: "lg",
                    variant: "ghost",
                  })}
                >
                  <span className="text-nowrap">Explore Kits</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mt-8 -mr-56 overflow-hidden mask-b-from-55% px-2 sm:mt-12 sm:mr-0 md:mt-20">
            <div className="ring-background bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg ring-1 inset-shadow-2xs shadow-zinc-950/15 dark:inset-shadow-white/20">
              <Image
                className="bg-background relative hidden aspect-15/8 rounded-2xl dark:block"
                src="/mail2.png"
                alt="app screen"
                width="2700"
                height="1440"
              />
              <Image
                className="border-border/25 relative z-2 aspect-15/8 rounded-2xl border dark:hidden"
                src="/mail2-light.png"
                alt="app screen"
                width="2700"
                height="1440"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background pt-16 pb-16 md:pb-32">
        <Wrapper className="group relative">
          <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
            <Link
              href="/"
              className="block text-sm duration-150 hover:opacity-75"
            >
              <span> Meet Our Customers</span>

              <ChevronRight className="ml-1 inline-block size-3" />
            </Link>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 group-hover:blur-xs sm:gap-x-16 sm:gap-y-14">
            <div className="flex">
              <img
                className="mx-auto h-5 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                alt="Nvidia Logo"
                height="20"
                width="auto"
              />
            </div>

            <div className="flex">
              <img
                className="mx-auto h-4 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/column.svg"
                alt="Column Logo"
                height="16"
                width="auto"
              />
            </div>
            <div className="flex">
              <img
                className="mx-auto h-4 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/github.svg"
                alt="GitHub Logo"
                height="16"
                width="auto"
              />
            </div>
            <div className="flex">
              <img
                className="mx-auto h-5 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/nike.svg"
                alt="Nike Logo"
                height="20"
                width="auto"
              />
            </div>
            <div className="flex">
              <img
                className="mx-auto h-5 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                alt="Lemon Squeezy Logo"
                height="20"
                width="auto"
              />
            </div>
            <div className="flex">
              <img
                className="mx-auto h-4 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/laravel.svg"
                alt="Laravel Logo"
                height="16"
                width="auto"
              />
            </div>
            <div className="flex">
              <img
                className="mx-auto h-7 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/lilly.svg"
                alt="Lilly Logo"
                height="28"
                width="auto"
              />
            </div>

            <div className="flex">
              <img
                className="mx-auto h-6 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/openai.svg"
                alt="OpenAI Logo"
                height="24"
                width="auto"
              />
            </div>
          </div>
        </Wrapper>
      </section>
    </main>
  );
};
