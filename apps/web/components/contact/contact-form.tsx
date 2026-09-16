"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Input, Textarea, useToast } from "@shafiq-info/ui";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PROJECT_TYPES = [
  "Custom software development",
  "Web application",
  "ERP / accounting system",
  "AI integration",
  "Other",
] as const;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  projectType: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  function validate(values: FormState) {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!values.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (values.message.trim().length < 20) {
      nextErrors.message = "Message should be at least 20 characters.";
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      // Stubbed until Phase 11 wires a real API endpoint (see API.md).
      console.info("[contact] submission (stubbed, not sent anywhere yet):", form);
      await new Promise((resolve) => setTimeout(resolve, 400));
      showToast({
        title: "Message received",
        description: "This form isn't wired to email yet — thanks for testing it.",
        variant: "success",
      });
      setForm(INITIAL_STATE);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex max-w-xl flex-col gap-5">
      <Input
        label="Name"
        required
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        error={errors.email}
      />
      <Input
        label="Subject"
        required
        value={form.subject}
        onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
        error={errors.subject}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="projectType" className="text-sm font-medium">
          Project type <span className="text-foreground-muted">(optional)</span>
        </label>
        <select
          id="projectType"
          value={form.projectType}
          onChange={(e) => setForm((f) => ({ ...f, projectType: e.target.value }))}
          className="w-full rounded-control border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <option value="">Select one…</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <Textarea
        label="Message"
        required
        rows={6}
        value={form.message}
        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        error={errors.message}
      />

      <Button type="submit" disabled={submitting} className="self-start">
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
