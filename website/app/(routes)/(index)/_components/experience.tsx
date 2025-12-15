import { Wrapper } from "@/components/wrapper";
import { TerminalBlock } from "@/components/terminal-block";
import { DEVELOPER_EXPERIENCE_FEATURES, INIT_COMMAND } from "@/constants";

export const DeveloperExperience = () => {
  return (
    <div className="from-card/50 via-card/20 to-background bg-linear-to-b py-16 sm:py-24 md:py-32">
      <Wrapper size="sm" className="space-y-8">
        <h2 className="z-10 max-w-xl font-mono text-2xl font-semibold capitalize sm:text-3xl md:text-4xl md:leading-12">
          Developer Experience <span className="text-primary">First</span>
        </h2>
        <div className="relative">
          <div className="relative z-10 space-y-4 md:w-1/2">
            <p className="text-muted-foreground leading-relaxed">
              Spawnkit was built with a singular focus:{" "}
              <span className="text-foreground font-medium">
                eliminate the friction
              </span>{" "}
              between having an idea and writing your first line of code.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-6">
              {DEVELOPER_EXPERIENCE_FEATURES.map((feature) => (
                <div className="flex items-center gap-2" key={feature}>
                  <span className="bg-primary h-1.5 w-1.5" />
                  <p className="text-muted-foreground text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 h-fit md:absolute md:inset-x-0 md:-inset-y-26 md:mt-0 md:mask-l-from-35% md:mask-l-to-55%">
            <div className="space-y-4 md:ml-auto md:max-w-lg">
              <TerminalBlock
                command={INIT_COMMAND}
                className="block md:hidden"
              />

              <div className="border-border/50 bg-card/80 rounded-2xl border p-5 font-serif text-sm backdrop-blur-sm">
                <div className="text-muted-foreground mb-3">
                  <span className="text-primary">?</span> Select a template:
                </div>
                <div className="text-muted-foreground space-y-1">
                  <div className="bg-primary/10 -mx-1 flex items-center gap-2 rounded-xl px-3 py-2">
                    <span className="text-primary">›</span>
                    <span className="text-foreground font-medium">
                      Next.js + Wagmi Starter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5">
                    <span className="opacity-0">›</span>
                    Hardhat + TypeScript Template
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5">
                    <span className="opacity-0">›</span>
                    Foundry Monorepo
                  </div>
                </div>
              </div>

              <div className="border-border/50 bg-card/80 rounded-2xl border p-5 font-serif text-sm backdrop-blur-sm">
                <div className="text-primary mb-1.5 flex items-center gap-2">
                  <span className="bg-primary h-2 w-2 rounded-full" />
                  Dependencies installed
                </div>
                <div className="text-primary flex items-center gap-2">
                  <span className="bg-primary h-2 w-2 rounded-full" />
                  Ready to build!
                </div>
                <div className="border-border/50 text-muted-foreground mt-4 border-t pt-3">
                  Run{" "}
                  <span className="text-foreground bg-secondary/50 rounded-lg px-2 py-0.5">
                    cd my-project && npm run dev
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
