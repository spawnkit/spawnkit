import { HowItWorks } from "./_components/process";
import { HeroComp } from "./_components/hero";
import { WhySpawnkit } from "./_components/purpose";
import { DeveloperExperience } from "./_components/experience";
import { CTA } from "./_components/cta";

export default async function Home() {
  return (
    <div className="flex-1 overflow-x-clip">
      <HeroComp />
      <HowItWorks />
      <WhySpawnkit />
      <DeveloperExperience />
      <CTA />
    </div>
  );
}
