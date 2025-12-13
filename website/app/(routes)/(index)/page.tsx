import { CTA } from "./_components/cta";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/process";
import { WhySpawnkit } from "./_components/purpose";
import { DeveloperExperienceFirst } from "./_components/experience";

export default function Home() {
  return (
    <div className="overflow-x-clip flex-1">
      <Hero />
      <HowItWorks />
      <WhySpawnkit />
      <DeveloperExperienceFirst />
      <CTA />
    </div>
  );
}
