import Link from "next/link";
import { Button } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { getProfile } from "@/services/profile.service";

export async function Cta() {
  const profile = await getProfile();

  return (
    <Section className="text-center">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Let&apos;s build something.
        </h2>
        <p className="text-foreground-muted">
          {profile.availability === "unavailable"
            ? "Not currently taking on new work, but feel free to reach out."
            : "Open to remote roles and select client projects."}
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Get in touch</Link>
        </Button>
      </div>
    </Section>
  );
}
