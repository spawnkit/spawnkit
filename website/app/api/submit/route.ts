import { kitSchema } from "@/lib/validators";
import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { values, user } = body;
    const formData = kitSchema.parse(values);

    const ownerId = `user-${user.githubId}`;

    const ownerDoc = await client.createIfNotExists({
      _id: ownerId,
      _type: "user",
      name: user.name,
      username: user.username,
      avatarUrl: user.avatar,
      githubId: user.githubId,
    });

    const repoExists = await client.fetch(
      `
        *[_type == "kit"
          && repo == $repo
          && owner._ref == $ownerId
        ][0]
      `,
      {
        repo: formData.githubUrl,
        ownerId,
      },
    );

    if (repoExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Repository has already been submitted",
        },
        { status: 409 },
      );
    }

    const presetExists = await client.fetch(
      `
        *[_type == "kit"
          && preset.current == $preset
          && owner._ref == $ownerId
        ][0]
      `,
      {
        preset: formData.preset,
        ownerId,
      },
    );

    if (presetExists) {
      return NextResponse.json(
        {
          success: false,
          message: `"${formData.preset}" is already in use. Please choose a different preset.`,
        },
        { status: 409 },
      );
    }

    const result = await client.create({
      _type: "kit",
      name: formData.name,
      description: formData.description,
      preset: {
        _type: "slug",
        current: formData.preset,
      },
      repo: formData.githubUrl,
      commands: formData.after,
      status: "pending",
      votes: 0,
      owner: {
        _type: "reference",
        _ref: ownerDoc._id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: result._id,
        message: "Template submitted and pending approval!",
      },
      { status: 201 },
    );
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to submit template";

    return NextResponse.json(
      { success: false, message: errMsg },
      { status: 500 },
    );
  }
}
