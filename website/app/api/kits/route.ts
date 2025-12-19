import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function GET() {
  try {
    // Use a read-only client (CDN) for published content
    const readClient = client.withConfig({ useCdn: true, token: undefined });

    const query = groq`
      *[_type == "kit" && status == "approved"] | order(name asc, _id asc) {
            "title": name,
            "preset": preset.current,
            "repo": repo,
            "after": commands,
        }
    `;

    const items = await readClient.fetch(query);

    return NextResponse.json(items);
  } catch (error) {
    console.error("/api/terms error", error);
    return NextResponse.json(
      { error: "Failed to fetch terms" },
      { status: 500 },
    );
  }
}
