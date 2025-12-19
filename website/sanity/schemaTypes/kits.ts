import { defineField, defineType } from "sanity";
import { Icons } from "hugeicons-proxy";

export const kitSchema = defineType({
  name: "kit",
  type: "document",
  title: "Template Kits",
  icon: Icons.GridIcon,
  fields: [
    defineField({
      name: "name",
      title: "Template Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "preset",
      title: "Template Preset (slug)",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "repo",
      title: "GitHub Repository",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "status",
      title: "Template Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
      },
    }),
    defineField({
      name: "votes",
      title: "Template Votes",
      type: "number",
      description: "Number of votes the template has received.",
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: "owner",
      title: "Template Creator",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "commands",
      title: "Post-Install commands",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
