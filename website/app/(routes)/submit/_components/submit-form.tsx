"use client";

import * as React from "react";
import { toast } from "sonner";
import { Icons } from "hugeicons-proxy";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/ui/button";
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
import { generatePreset } from "@/lib/utils";
import { RepoValidation } from "@/lib/api/github.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { RepoSelector } from "./repo-selector";
import { useUserStore } from "@/lib/stores/user-store";
import { KitFormData, kitSchema } from "@/lib/validators";

export const SubmitForm = () => {
  const uuid = React.useId();
  const router = useRouter();

  const [afterCommands, setAfterCommands] = React.useState<string[]>([]);
  const [afterInput, setAfterInput] = React.useState("");
  const [repoValidation, setRepoValidation] =
    React.useState<RepoValidation | null>(null);

  const user = useUserStore((s) => s.user);
  const isAuthenticated = !!user;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const form = useForm<KitFormData>({
    resolver: zodResolver(kitSchema),
    defaultValues: {
      name: "",
      preset: "",
      githubUrl: "",
      description: "",
      after: [],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const isDisabled = !mounted ? true : isSubmitting || !isAuthenticated;

  // eslint-disable-next-line react-hooks/incompatible-library
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
    if (isDisabled) return;
    const newCommands = afterCommands.filter((cmd) => cmd !== cmdToRemove);
    setAfterCommands(newCommands);
    form.setValue("after", newCommands);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCommand();
    }
  };

  async function onSubmit(values: KitFormData) {
    if (!isAuthenticated) {
      toast.error("Connect your GitHub account to submit a kit.");
      return;
    }
    if (!repoValidation || !repoValidation.exists || repoValidation.isPrivate) {
      form.setError("githubUrl", {
        message:
          repoValidation?.error ||
          "Please enter a valid public GitHub repository URL",
      });
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values, user }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Your template is now pending review.");
        form.reset();
        setAfterCommands([]);

        router.push("/community");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to submit template";
      toast.error("Submission failed", {
        description: errMsg,
      });
    }
  }

  return (
    <Card className="px-1 sm:px-4">
      <CardHeader className="pt-1 sm:pt-4">
        <CardTitle className="text-xl font-medium">Template Details</CardTitle>
      </CardHeader>
      <CardContent className="pb-1 sm:pb-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem id={uuid}>
                  <FormLabel className="font-serif text-xs uppercase">
                    <span>Template Name</span>
                    <span className="text-destructive -mt-2 -ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="overflow-hidden rounded-xl md:h-12 md:pr-0.5">
                      <InputGroupAddon>
                        <Icons.DocumentCodeIcon className="h-4 w-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        disabled={isDisabled}
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
                <FormItem id={uuid}>
                  <FormLabel className="font-serif text-xs uppercase">
                    <span>Preset Slug</span>
                    <span className="text-destructive -mt-2 -ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="overflow-hidden rounded-xl md:h-12 md:pr-0.5">
                      <InputGroupAddon>
                        <span className="text-muted-foreground font-serif text-xs">
                          npx spawnkit
                        </span>
                      </InputGroupAddon>
                      <InputGroupInput
                        placeholder="nextjs-wagmi-starter"
                        className="font-serif text-xs!"
                        disabled={isDisabled}
                        {...field}
                      />
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
                <FormItem id={uuid}>
                  <FormLabel className="font-serif text-xs uppercase">
                    <span>GitHub Repository URL</span>
                    <span className="text-destructive -mt-2 -ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <RepoSelector
                      value={field.value}
                      onChange={field.onChange}
                      onValidation={handleRepoValidation}
                      error={errors.githubUrl?.message}
                      disabled={isDisabled}
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
                <FormItem id={uuid}>
                  <FormLabel className="font-serif text-xs uppercase">
                    <span>Post-Install Commands</span>
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <InputGroup className="overflow-hidden rounded-xl md:h-12 md:pr-0.5">
                        <InputGroupAddon>
                          <Icons.CodeSimpleIcon className="h-4 w-4" />
                        </InputGroupAddon>
                        <InputGroupInput
                          placeholder="e.g., npm run dev"
                          value={afterInput}
                          disabled={isDisabled}
                          onChange={(e) => setAfterInput(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e)}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleAddCommand}
                            disabled={isDisabled}
                          >
                            <Icons.AddIcon className="h-4 w-4" />
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
                                className="hover:text-destructive rounded-lg p-1"
                              >
                                <Icons.Cancel01Icon className="h-3 w-3" />
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
              name="description"
              render={({ field }) => (
                <FormItem id={uuid}>
                  <FormLabel className="font-serif text-xs uppercase">
                    <span>Description</span>
                    <span className="text-destructive -mt-2 -ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputGroup className="overflow-hidden rounded-xl md:px-1">
                      <InputGroupTextarea
                        placeholder="Briefly describe what this template includes and who it's for..."
                        rows={4}
                        disabled={isDisabled}
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
              disabled={isDisabled}
              isLoading={isSubmitting}
              loadingText="Submitting for review..."
            >
              Submit for Review
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
