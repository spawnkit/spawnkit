import Link from "next/link";

import { buttonVariants } from "@/ui/button";
import { Icons } from "hugeicons-proxy";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="px-4 text-center">
        <h1 className="text-primary mb-6 max-w-3xl font-mono text-4xl font-bold text-balance sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          404
        </h1>
        <h1 className="mb-2 font-serif text-2xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-sm font-normal">
          Looks like this route doesn&apos;t exist. Maybe try spawning something
          new?
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className={buttonVariants()}>
            <Icons.Home01Icon className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/community"
            className={buttonVariants({ variant: "outline" })}
          >
            <Icons.ArrowLeft02Icon className="h-4 w-4" />
            <span>Browse Kits</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
