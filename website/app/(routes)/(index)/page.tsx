import { Features } from "./_components/features";
import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <div className="overflow-x-clip flex-1">
      <Hero />
      <Features />
    </div>
  );
}
