import { Wrapper } from "@/components/wrapper";

export const HeroComp = () => {
  return (
    <div className="py-16 sm:py-24 md:py-32">
      <Wrapper size="sm">
        <h1 className="max-w-3xl text-balance font-mono text-4xl sm:text-5xl md:text-6xl font-medium lg:text-7xl lg:leading-20">
          Community Kits
        </h1>
        <p className="mt-4 sm:mt-6 md:max-w-lg text-pretty text-base md:text-lg">
          Browse and vote on community-submitted starter templates. Top-voted
          kits get added to the CLI for everyone to use.
        </p>
      </Wrapper>
    </div>
  );
};
