import { type SchemaTypeDefinition } from "sanity";
import { kitsSchema } from "./kits";
import { usersSchema } from "./users";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [kitsSchema, usersSchema],
};
