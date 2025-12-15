import { Button, buttonVariants } from "@/ui/button";
import { INIT_COMMAND } from "@/constants";
import { Wrapper } from "@/components/wrapper";
import { TerminalBlock } from "@/components/terminal-block";

export const CTA = () => {
  return (
    <div className="py-16 sm:py-24 md:py-32">
      <Wrapper>
        <div className="mx-auto max-w-3xl text-center">
          <div className="from-primary/10 border-border/50 rounded-[3rem] border bg-linear-to-b to-transparent px-6 py-8 sm:p-8 md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Spawn your next project in seconds
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-lg">
              Join thousands of developers who&apos;ve ditched the boilerplate
              hunt.
            </p>

            <TerminalBlock
              command={INIT_COMMAND}
              className="mx-auto mb-8 max-w-md"
            />

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg">Get Started Now</Button>
              <a
                href="https://github.com/spawnkit"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "link" })}
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
