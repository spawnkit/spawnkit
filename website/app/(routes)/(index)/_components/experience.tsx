import { Wrapper } from "@/components/wrapper";
import { TerminalBlock } from "@/components/terminal-block";
import { DEVELOPER_EXPERIENCE_FEATURES, INIT_COMMAND } from "@/lib/constants";

export const DeveloperExperienceFirst = () => {
  return (
    <div className="from-card/80 via-card/40 to-background bg-linear-to-b py-16 md:py-32">
      <Wrapper className="flex flex-col gap-8">
        <h2 className="text-4xl font-semibold">
          Developer Experience <span className="text-primary">First</span>
        </h2>
        <div className="relative">
          <div className="relative z-10 space-y-6 md:w-1/2">
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Spawnkit was built with a singular focus: eliminate the friction
              between having an idea and writing your first line of code.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {DEVELOPER_EXPERIENCE_FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <span className="bg-primary h-1.5 w-1.5" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 h-fit md:absolute md:inset-x-0 md:-inset-y-36 md:mt-0 md:mask-l-from-15% md:mask-l-to-55%">
            <div className="ml-auto w-full space-y-4 md:max-w-lg lg:max-w-xl">
              <TerminalBlock command={INIT_COMMAND} />

              <div className="border-border bg-card border-2 p-4 font-mono text-sm">
                <div className="text-muted-foreground mb-2">
                  <span className="text-primary">?</span> Select a template:
                </div>
                <div className="text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">›</span>
                    <span className="text-foreground">
                      Next.js + Wagmi Starter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    Hardhat + TypeScript Template
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    React + RainbowKit
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    Foundry Monorepo
                  </div>
                </div>
              </div>

              <div className="border-border bg-card border-2 p-4 font-mono text-sm">
                <div className="text-primary mb-1">✓ Template cloned</div>
                <div className="text-primary mb-1">
                  ✓ Dependencies installed
                </div>
                <div className="text-primary">✓ Ready to build!</div>
                <div className="text-muted-foreground mt-3">
                  Run{" "}
                  <span className="text-foreground">
                    cd my-project && pnpm run dev
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
