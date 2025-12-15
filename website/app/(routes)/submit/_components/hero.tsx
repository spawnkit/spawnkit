import { Icon } from "@/components/hugeicons";
import { Wrapper } from "@/components/wrapper";
import { Card, CardContent } from "@/ui/card";
import React from "react";
import { SubmitForm } from "./submit-form";

const SUBMISSION_GUIDLINES = [
  "Repository must be public and accessible",
  "Include a README with setup instructions",
  "Template should be actively maintained",
  "Community votes influence approval decisions",
];

export const HeroComp = () => {
  return (
    <div className="py-16 sm:py-24 md:py-32">
      <Wrapper size="sm" className="max-w-2xl">
        <h1 className="max-w-3xl font-mono text-4xl font-medium text-balance sm:text-5xl md:text-6xl lg:text-7xl lg:leading-20">
          Submit a Kit
        </h1>
        <p className="my-4 text-base text-pretty sm:mb-6 md:max-w-lg md:text-lg">
          Share your starter template with the Spawnkit community. All
          submissions are reviewed before approval.
        </p>

        {/* Notice */}
        <Card className="mb-8 rounded-2xl border-blue-500/40 bg-blue-500/10">
          <CardContent>
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <div className="bg-primary/10 rounded-xl p-2">
                <Icon.AlertSquareIcon className="text-primary h-5 w-5" />
              </div>
              <div className="text-sm">
                <p className="mb-3 font-serif text-[11px] font-normal uppercase sm:text-xs">
                  Submission Guidelines
                </p>
                <ul className="space-y-1.5">
                  {SUBMISSION_GUIDLINES.map((guidline) => (
                    <li key={guidline} className="flex items-center gap-2">
                      <span className="bg-primary/60 h-1.5 w-1.5 rounded-full" />
                      <span className="text-sm font-normal">{guidline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <SubmitForm />
      </Wrapper>
    </div>
  );
};
