import { ArrowRight } from "lucide-react";

import { Button, buttonVariants } from "@/ui/button";
import { Wrapper } from "@/components/wrapper";
import { INIT_COMMAND } from "@/lib/constants";
import { TerminalBlock } from "@/components/terminal-block";
import Link from "next/link";

export const CTA = () => {
  return (
    <div className="py-16 md:py-32">
      <Wrapper className="flex flex-col gap-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Spawn your next project in seconds
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of developers who&apos;ve ditched the boilerplate
            hunt.
          </p>

          <TerminalBlock
            command={INIT_COMMAND}
            className="max-w-md mx-auto mb-8"
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button>
              <span className="font-medium">Get Started Now</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Link
              href="https://github.com/spawnkit"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "link" })}
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
