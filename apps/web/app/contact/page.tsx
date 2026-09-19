import type { Metadata } from "next";
import { Section } from "@/components/common/section";
import { ContactCard } from "@/components/contact/contact-card";
import { getProfile } from "@/services/profile.service";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about remote roles or a project.",
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <Section
      eyebrow="Get in touch"
      title="Contact"
      titleAs="h1"
      description={profile.shortDescription}
    >
      <ContactCard profile={profile} />
    </Section>
  );
}
