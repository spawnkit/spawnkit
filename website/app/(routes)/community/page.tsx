import { sanityFetch } from "@/sanity/lib/live";
import { Filters } from "./_components/filters";
import { HeroComp } from "./_components/hero";
import { queryKits } from "@/sanity/lib/queries";
import { QueryKitsResult } from "@/sanity.types";

export default async function Community() {
  const { data: kits } = await sanityFetch({
    query: queryKits,
  });

  return (
    <div className="flex-1 overflow-x-clip">
      <HeroComp />
      <Filters kits={kits as QueryKitsResult} />
    </div>
  );
}
