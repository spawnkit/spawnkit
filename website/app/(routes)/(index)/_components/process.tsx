import { Wrapper } from "@/components/wrapper";
import { FEATURES } from "@/constants";
import { siteConfig } from "@/config/site.config";

export const HowItWorks = () => {
  return (
    <div className="from-card/50 via-card/20 to-background bg-linear-to-b py-16 sm:py-24 md:py-32">
      <Wrapper size="sm" className="space-y-4 sm:space-y-8 md:space-y-12">
        <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
          <h2 className="max-w-sm font-mono text-2xl font-semibold capitalize sm:text-3xl md:max-w-max md:text-4xl md:leading-12">
            How {siteConfig.title} Works
          </h2>
          <p className="max-w-sm text-base sm:ml-auto"></p>
        </div>
        <div className="pt-3 sm:px-3 md:-mx-8 lg:-mx-10">
          <div className="relative aspect-88/36 mask-b-from-75% mask-b-to-95%">
            <div className="ring-background bg-background relative overflow-hidden rounded-2xl border p-2 shadow-lg ring-1 inset-shadow-2xs shadow-zinc-950/15 sm:rounded-3xl sm:p-4 md:rounded-4xl dark:inset-shadow-white/20">
              <video
                src="/how-it-works-dark.mov"
                width={2797}
                height={1137}
                autoPlay
                loop
                muted // Required for autoplay in most browsers
                playsInline // For iOS
                controls={false}
                preload="metadata" // or "none" for lazy loading
                poster="/hiw-dark.gif"
                className="bg-background pointer-events-none relative hidden rounded-lg sm:rounded-xl md:rounded-2xl dark:block"
              />
              <video
                src="/how-it-works-light.mov"
                width={2797}
                height={1137}
                autoPlay
                loop
                muted // Required for autoplay in most browsers
                playsInline // For iOS
                controls={false}
                preload="metadata" // or "none" for lazy loading
                poster="/hiw-light.gif"
                className="border-border/25 relative z-2 rounded-lg border sm:rounded-xl md:rounded-2xl dark:hidden"
              />
            </div>
          </div>
        </div>
      </Wrapper>

      <Wrapper className="relative mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex items-center gap-2">
              <feature.icon className="size-4" />
              <h3 className="text-sm font-medium">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};
