import { Button } from "@/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="font-mono text-8xl font-bold text-primary mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground font-normal mb-8 max-w-md mx-auto">
          Looks like this route doesn&apos;t exist. Maybe try spawning something
          new?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/community">
              <ArrowLeft className="h-4 w-4" />
              Browse Kits
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
