"use client";

import { z } from "zod";
import * as React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, FileText, Tag, X } from "lucide-react";

import { addKit } from "@/lib/kits-data";
import { Wrapper } from "@/components/wrapper";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
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
} from "@/ui/input-group";
import { RepoValidation } from "@/lib/api/github.api";
import { RepoSelector } from "./_components/selector";

const kitSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  githubUrl: z
    .string()
    .refine((url) => url.includes("github.com"), "Must be a GitHub URL"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(200, "Description must be less than 200 characters"),
  stack: z.array(z.string()).min(1, "Add at least one tech stack tag"),
});

type KitFormData = z.infer<typeof kitSchema>;

export default function Submit() {
  const router = useRouter();
  const [stack, setStack] = React.useState<string[]>([]);
  const [stackInput, setStackInput] = React.useState("");
  const [repoValidation, setRepoValidation] =
    React.useState<RepoValidation | null>(null);

  const form = useForm<KitFormData>({
    resolver: zodResolver(kitSchema),
    defaultValues: {
      name: "",
      githubUrl: "",
      description: "",
      stack: [],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: KitFormData) {
    // Check repo validation
    if (!repoValidation || !repoValidation.exists || repoValidation.isPrivate) {
      form.setError("githubUrl", {
        message:
          repoValidation?.error ||
          "Please enter a valid public GitHub repository URL",
      });
      return;
    }

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    addKit(values);

    toast.success("Kit submitted!", {
      description: "Your template is now pending review.",
    });

    form.reset();
    setStack([]);

    router.push("/community");
  }

  return (
    <div className="flex-1 overflow-x-clip py-16 md:py-32">
      <Wrapper>
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-10">
            <h1 className="mb-4 text-4xl font-bold">Submit a Kit</h1>
            <p className="text-muted-foreground">
              Share your starter template with the Spawnkit community. All
              submissions are reviewed before approval.
            </p>
          </div>

          {/* Notice */}
          <div className="border-primary/30 bg-primary/5 mb-8 flex items-start gap-3 border-2 p-4">
            <AlertCircle className="text-primary mt-0.5 h-5 w-5 shrink-0" />
            <div className="text-sm">
              <p className="mb-1 font-medium">Submission Guidelines</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Repository must be public and accessible</li>
                <li>• Include a README with setup instructions</li>
                <li>• Template should be actively maintained</li>
                <li>• Community votes influence approval decisions</li>
              </ul>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupAddon>
                          <FileText className="h-4 w-4" />
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
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Repository URL</FormLabel>
                    <FormControl>
                      <RepoSelector
                        value={field.value}
                        onChange={field.onChange}
                        onValidation={handleRepoValidation}
                        error={errors.githubUrl?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="stack"
                render={() => (
                  <FormItem>
                    <FormLabel>Tech Stack Tags</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <InputGroup>
                          <InputGroupAddon>
                            <Tag className="h-4 w-4" />
                          </InputGroupAddon>
                          <InputGroupInput
                            disabled={isSubmitting}
                            placeholder="e.g., Next.js, TypeScript"
                            value={stackInput}
                            onChange={(e) => setStackInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={handleAddTag}
                              disabled={stack.length >= 6 || isSubmitting}
                              className="sm:-mr-1"
                            >
                              Add
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>

                        {stack.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {stack.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="gap-1 pr-1"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTag(tag)}
                                  className="hover:text-destructive ml-1"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Briefly describe what this template includes and who it's for..."
                        rows={4}
                        className="min-h-40"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value.length}/200 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Submit for Review
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </Wrapper>
    </div>
  );
}
