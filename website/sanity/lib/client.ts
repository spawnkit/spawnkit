import { createClient } from "next-sanity";

import { assertValue } from "@/lib/utils";
import { apiVersion, dataset, projectId } from "../env";

const token = assertValue(
  process.env.SANITY_WRITE_TOKEN,
  "Missing environment variable SANITY_WRITE_TOKEN",
);

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
});
