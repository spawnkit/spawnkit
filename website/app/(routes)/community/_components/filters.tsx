"use client";

import React from "react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/input-group";
import { Card } from "@/ui/card";
import { Wrapper } from "@/components/wrapper";
import { Icons } from "hugeicons-proxy";
import { Button } from "@/ui/button";
import { FilterStatus } from "@/lib/types";
import { KitCard } from "@/components/kit-card";
import { getKits, Kit } from "@/lib/kits";
import Link from "next/link";

export const Filters = () => {
  const [kits, setKits] = React.useState<Kit[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<FilterStatus>("all");

  React.useEffect(() => {
    setKits(getKits());
  }, []);

  const filteredKits = kits
    .filter((kit) => {
      if (filterStatus !== "all" && kit.status !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          kit.name.toLowerCase().includes(query) ||
          kit.description.toLowerCase().includes(query) ||
          kit.stack.some((tech) => tech.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="flex-1 pb-16 sm:pb-24 md:pb-32">
      <Wrapper className="flex flex-col gap-6 md:gap-8">
        <Card className="flex flex-row flex-wrap items-center gap-2 p-4">
          <InputGroup className="mb-2 sm:mr-4 sm:mb-0 sm:max-w-sm">
            <InputGroupAddon className="text-muted-foreground">
              <Icons.SearchAreaIcon className="text-muted-foreground size-5" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search templates, stacks.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <Icons.FilterIcon className="size-5" />
            </InputGroupAddon>
          </InputGroup>

          {(["all", "approved", "pending", "rejected"] as FilterStatus[]).map(
            (status) => (
              <Button
                size="sm"
                key={status}
                className="capitalize"
                onClick={() => setFilterStatus(status)}
                variant={filterStatus === status ? "secondary" : "ghost"}
              >
                <span className="text-xs sm:text-sm">{status}</span>
                {status !== "all" && (
                  <span className="font-serif text-xs opacity-60">
                    ({kits.filter((k) => k.status === status).length})
                  </span>
                )}
              </Button>
            ),
          )}
        </Card>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Showing{" "}
            <span className="text-foreground font-medium">
              {filteredKits.length}
            </span>{" "}
            kits
          </p>
        </div>

        {/* Kits Grid */}
        {filteredKits.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredKits.map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        ) : (
          <div className="border-border bg-card/30 rounded-lg border border-dashed py-20 text-center">
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Icons.SearchIcon className="text-muted-foreground h-8 w-8" />
            </div>
            <p className="text-muted-foreground mb-4">
              No kits found matching your criteria.
            </p>
            <Button asChild variant="outline">
              <Link href="/submit">Submit the first kit</Link>
            </Button>
          </div>
        )}
      </Wrapper>
    </div>
  );
};
