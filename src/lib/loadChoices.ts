import choicesData from "@/choices.json" assert { type: "json" };

import { CHOICES_API_URL, NODE_ENV } from "@/lib/constants";
import { type ChoicesType, queryChoices } from "@/lib/choices";

export async function loadChoices(): Promise<ChoicesType[]> {
  const isDev = NODE_ENV === "dev";
  if (isDev) return await queryChoices(choicesData);

  const apiUrl = CHOICES_API_URL;
  if (!apiUrl)
    throw new Error("CHOICES_API_URL is not defined in production mode.");

  return await queryChoices(apiUrl);
}
