import { Filters } from "./_components/filters";
import { HeroComp } from "./_components/hero";

export default function Community() {
  return (
    <div className="flex-1 overflow-x-clip">
      <HeroComp />
      <Filters />
    </div>
  );
}
