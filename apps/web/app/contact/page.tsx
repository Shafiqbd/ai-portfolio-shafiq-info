import type { Metadata } from "next";
import { Section } from "@/components/common/section";
import { ContactForm } from "@/components/contact/contact-form";
import { getProfile } from "@/services/profile.service";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about remote roles or a project.",
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <Section eyebrow="Get in touch" title="Contact" description={profile.tagline}>
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
        <ContactForm />
        <div className="flex flex-col gap-2 text-sm text-foreground-muted">
          <p className="font-medium text-foreground">Direct</p>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">
            {profile.email}
          </a>
          {profile.phone && (
            <a href={`tel:${profile.phone}`} className="hover:text-foreground">
              {profile.phone}
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
