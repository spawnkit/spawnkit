import { Wrapper } from "@/components/wrapper";
import { HOW_IT_WORKS } from "@/lib/constants";

export const HowItWorks = () => {
  return (
    <div className="py-16 md:py-32">
      <Wrapper className="flex flex-col gap-12">
        <div className="relative z-10 mx-auto max-w-xl space-y-4 text-center">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            How It Works
          </h2>
          <p>From terminal to running project in under 60 seconds.</p>
        </div>

        <div className="relative mx-auto grid divide-x divide-y border *:p-12 sm:grid-cols-2">
          {HOW_IT_WORKS.map((feature) => (
            <div key={feature.step} className="space-y-2">
              <div className="flex items-center gap-2">
                <feature.icon className="size-4" />
                <h3 className="text-sm font-medium">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};
