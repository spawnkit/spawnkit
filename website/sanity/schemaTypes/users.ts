import { defineField, defineType } from "sanity";
import { Icons } from "hugeicons-proxy";

export const usersSchema = defineType({
  name: "users",
  type: "document",
  title: "Users",
  icon: Icons.UserGroupIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
