import type { Metadata } from "next";
import { Section } from "@/components/common/section";
import { ResumeSwitcher } from "@/components/resume/resume-switcher";
import { getResumeVariants } from "@/services/resume.service";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download a role-specific CV: Software Engineer, Full-Stack/Remote, or Academic.",
};

export default async function ResumePage() {
  const variants = await getResumeVariants();

  return (
    <Section
      eyebrow="CV"
      title="Resume"
      titleAs="h1"
      description="Pick the version that fits what you're looking for."
    >
      <ResumeSwitcher variants={variants} />
    </Section>
  );
}
