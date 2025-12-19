import { groq } from "next-sanity";

export const queryKits = groq`
*[_type == "kit"] | order(_createdAt desc) {
  _createdAt,
    _id,
    name,
    "preset": preset.current,
    description,
    repo,
    status,
    votes,
    owner -> {
      name,
      username,
      githubId,
      avatarUrl
    }
}`;
