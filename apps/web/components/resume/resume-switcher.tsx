"use client";

import type { ResumeVariant } from "@shafiq-info/types";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@shafiq-info/ui";

export function ResumeSwitcher({ variants }: { variants: ResumeVariant[] }) {
  if (variants.length === 0) return null;

  return (
    <Tabs defaultValue={variants[0].id}>
      <TabsList>
        {variants.map((variant) => (
          <TabsTrigger key={variant.id} value={variant.id}>
            {variant.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {variants.map((variant) => (
        <TabsContent key={variant.id} value={variant.id}>
          {variant.fileUrl ? (
            <Button asChild>
              <a href={variant.fileUrl} target="_blank" rel="noopener noreferrer">
                Download {variant.label} CV
              </a>
            </Button>
          ) : (
            <p className="text-sm text-foreground-muted">
              The {variant.label} CV isn&apos;t published yet — check back soon, or{" "}
              <a href="/contact" className="text-accent underline underline-offset-2">
                get in touch
              </a>{" "}
              directly.
            </p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
