import { defineField, defineType } from "sanity";
import { Icons } from "hugeicons-proxy";

export const userSchema = defineType({
  name: "user",
  type: "document",
  title: "Users",
  icon: Icons.UserGroupIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "githubId",
      title: "GitHub ID",
      type: "string",
      description: "Numeric GitHub user ID",
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "avatarUrl",
      title: "Avatar URL",
      type: "url",
      description: "Profile image URL from GitHub",
      readOnly: true,
    }),
  ],
});
