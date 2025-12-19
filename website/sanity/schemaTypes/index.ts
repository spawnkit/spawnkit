import { type SchemaTypeDefinition } from "sanity";
import { kitSchema } from "./kits";
import { userSchema } from "./users";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [kitSchema, userSchema],
};
