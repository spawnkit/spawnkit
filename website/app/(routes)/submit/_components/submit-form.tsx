"use client";

import { z } from "zod";
import * as React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/ui/input-group";
import { AFTER_COMMANDS } from "@/constants";
import { generatePreset, sleep } from "@/lib/utils";
import { RepoValidation } from "@/lib/api/github.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Icon } from "@/components/hugeicons";
import { TbCopy } from "react-icons/tb";
import { RepoSelector } from "./repo-selector";
import { addKit } from "@/lib/kits";

const kitSchema = z.object({
  name: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  preset: z
    .string()
    .min(3, "Preset must be at least 3 characters")
    .max(50, "Preset must be less than 50 characters")
    .regex(/^[a-z0-9-]+$/, "Preset must be lowercase with hyphens only"),
  githubUrl: z
    .string("Repo URL is required")
    .refine((url) => url.includes("github.com"), "Must be a GitHub URL"),
  after: z.array(z.string()).min(1, "Add at least one command"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(200, "Description must be less than 200 characters"),
  stack: z.array(z.string()).min(1, "Add at least one tech stack tag"),
});

type KitFormData = z.infer<typeof kitSchema>;

export const SubmitForm = () => {
  const router = useRouter();

  const [stack, setStack] = React.useState<string[]>([
    "typescript",
    "wagmi",
    "nextjs",
  ]);
  const [stackInput, setStackInput] = React.useState("");
  const [afterCommands, setAfterCommands] =
    React.useState<string[]>(AFTER_COMMANDS);
  const [afterInput, setAfterInput] = React.useState("");
  const [repoValidation, setRepoValidation] =
    React.useState<RepoValidation | null>(null);

  const form = useForm<KitFormData>({
    resolver: zodResolver(kitSchema),
    defaultValues: {
      name: "Next.js + Wagmi Starter",
      preset: "nextjs-wagmi-starter",
      githubUrl: "https://github.com/github/copilot-cli",
      after: AFTER_COMMANDS,
      description: "This is a test description for some reason",
      stack: ["typescript", "wagmi", "nextjs"],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const watchTitle = form.watch("name");

  React.useEffect(() => {
    if (watchTitle) {
      const preset = generatePreset(watchTitle);
      form.setValue("preset", preset);
    }
  }, [watchTitle, form]);

  const handleRepoValidation = React.useCallback(
    (validation: RepoValidation | null) => {
      setRepoValidation(validation);
      if (validation && (!validation.exists || validation.isPrivate)) {
        form.setError("githubUrl", {
          message: validation.error || "Invalid repository",
        });
      } else {
        form.clearErrors("githubUrl");
      }
    },
    [form],
  );

  const handleAddTag = () => {
    const tag = stackInput.trim();
    if (tag && !stack.includes(tag) && stack.length < 6) {
      const newStack = [...stack, tag];
      setStack(newStack);
      form.setValue("stack", newStack);
      setStackInput("");
      form.clearErrors("stack");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newStack = stack.filter((tag) => tag !== tagToRemove);
    setStack(newStack);
    form.setValue("stack", newStack);
  };

  const handleAddCommand = () => {
    const cmd = afterInput.trim();
    if (cmd && !afterCommands.includes(cmd)) {
      const newCommands = [...afterCommands, cmd];
      setAfterCommands(newCommands);
      form.setValue("after", newCommands);
      setAfterInput("");
      form.clearErrors("after");
    }
  };

  const handleRemoveCommand = (cmdToRemove: string) => {
    const newCommands = afterCommands.filter((cmd) => cmd !== cmdToRemove);
    setAfterCommands(newCommands);
    form.setValue("after", newCommands);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: "tag" | "command") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (action === "tag") handleAddTag();
      else handleAddCommand();
    }
  };

  async function onSubmit(values: KitFormData) {
    if (!repoValidation || !repoValidation.exists || repoValidation.isPrivate) {
      form.setError("githubUrl", {
        message:
          repoValidation?.error ||
          "Please enter a valid public GitHub repository URL",
      });
      return;
    }
    await sleep();
    addKit(values);
    toast.success(`${values.name} submitted!`, {
      description: "Your template is now pending review.",
    });

    form.reset();
    setStack([]);
    setAfterCommands([]);

    router.push("/community");
  }

  return (
    <Card className="px-1.5 sm:px-4">
      <CardHeader className="pt-1.5 sm:pt-4">
        <CardTitle className="text-xl font-medium">Template Details</CardTitle>
      </CardHeader>
      <CardContent className="pb-1.5 sm:pb-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-serif text-xs uppercase">
                    Template Name
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="overflow-hidden rounded-xl md:h-12 md:px-1">
                      <InputGroupAddon>
                        <Icon.DocumentValidationIcon className="h-4 w-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        disabled={isSubmitting}
                        placeholder="e.g., Next.js + Wagmi Starter"
                        {...field}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="preset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-serif text-xs uppercase">
                    Preset Slug
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="overflow-hidden rounded-xl md:h-12 md:px-1">
                      <InputGroupAddon>
                        <span className="text-muted-foreground font-serif text-xs">
                          npx spawnkit
                        </span>
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="nextjs-wagmi-starter"
                        className="font-serif text-xs!"
                        disabled={isSubmitting}
                        {...field}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          size="sm"
                          disabled
                          className="disabled:opacity-100"
                        >
                          <TbCopy />
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormDescription>
                    Users will run: npx spawnkit {field.value || "preset-name"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-serif text-xs uppercase">
                    GitHub Repository URL
                  </FormLabel>
                  <FormControl>
                    <RepoSelector
                      value={field.value}
                      onChange={field.onChange}
                      onValidation={handleRepoValidation}
                      error={errors.githubUrl?.message}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="after"
              render={() => (
                <FormItem>
                  <FormLabel className="font-serif text-xs uppercase">
                    Post-Install Commands
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <InputGroup className="overflow-hidden rounded-xl md:h-12 md:px-1">
                        <InputGroupAddon>
                          <Icon.ComputerTerminalIcon className="h-4 w-4" />
                        </InputGroupAddon>
                        <InputGroupInput
                          placeholder="e.g., npm run dev"
                          value={afterInput}
                          disabled={isSubmitting}
                          onChange={(e) => setAfterInput(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, "command")}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleAddCommand}
                            disabled={isSubmitting}
                          >
                            <Icon.AddIcon className="h-4 w-4" />
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>

                      {afterCommands.length > 0 && (
                        <div className="bg-secondary/50 space-y-1 rounded-xl p-4 font-serif text-sm">
                          {afterCommands.map((cmd, idx) => (
                            <div
                              key={idx}
                              className="group flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-1">
                                <span className="text-muted-foreground text-xs">
                                  {idx + 1}.
                                </span>
                                <code className="text-foreground font-serif text-xs">
                                  {cmd}
                                </code>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveCommand(cmd)}
                                className="hover:text-destructive rounded-lg p-1 opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <Icon.Cancel01Icon className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Commands users should run after cloning. Press Enter to add.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="stack"
              render={() => (
                <FormItem>
                  <FormLabel className="font-serif text-xs uppercase">
                    Tech Stack Tags
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <InputGroup className="overflow-hidden rounded-xl md:h-12 md:px-1">
                        <InputGroupAddon>
                          <Icon.Tag01Icon className="h-4 w-4" />
                        </InputGroupAddon>
                        <InputGroupInput
                          placeholder="e.g., Next.js, TypeScript"
                          value={stackInput}
                          disabled={isSubmitting}
                          onChange={(e) => setStackInput(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, "tag")}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleAddTag}
                            disabled={stack.length >= 6 || isSubmitting}
                          >
                            <Icon.AddIcon className="h-4 w-4" />
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>

                      {stack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {stack.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="gap-1 rounded-full pr-1.5"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:text-destructive rounded-full p-0.5"
                              >
                                <Icon.Cancel01Icon className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>

                  <FormDescription className="flex-1">
                    Add up to 6 tags. Press Enter to add.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-serif text-xs uppercase">
                    Description
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="overflow-hidden rounded-xl md:px-1">
                      <InputGroupTextarea
                        placeholder="Briefly describe what this template includes and who it's for..."
                        rows={4}
                        disabled={isSubmitting}
                        className="resize-none rounded-xl"
                        {...field}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormDescription className="flex-1">
                    Length {field.value.length}/200 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              className="h-12 w-full gap-2 rounded-full"
              disabled={isSubmitting}
            >
              Submit for Review
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
