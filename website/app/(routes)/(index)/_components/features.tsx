import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Terminal, Palette, FolderCheck, PackageCheck } from "lucide-react";
import { Wrapper } from "@/components/wrapper";

export const Features = () => {
  return (
    <Wrapper>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40">
          <CardHeader>
            <Palette className="h-10 w-10 text-cyan-500" />
            <CardTitle className="mt-4">Pick your vibe</CardTitle>
            <CardDescription>
              Choose from default, genz, or shakespeare language styles for a
              personalized CLI experience.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-border/40">
          <CardHeader>
            <Terminal className="h-10 w-10 text-cyan-500" />
            <CardTitle className="mt-4">Curated templates</CardTitle>
            <CardDescription>
              Access pre-configured dApp starters from local JSON in dev and
              remote sources in production.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-border/40">
          <CardHeader>
            <FolderCheck className="h-10 w-10 text-cyan-500" />
            <CardTitle className="mt-4">Safe folder handling</CardTitle>
            <CardDescription>
              Override, rename, or cancel if target folder exists — no
              accidental overwrites.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-border/40">
          <CardHeader>
            <PackageCheck className="h-10 w-10 text-cyan-500" />
            <CardTitle className="mt-4">Auto-install deps</CardTitle>
            <CardDescription>
              Automatically detects your package manager and installs
              dependencies for you.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </Wrapper>
  );
};
