import type { Metadata } from "next";
import { EmptyState } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { getProjects } from "@/services/project.service";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software projects built across FinTech, education, e-commerce, and more.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Section
      eyebrow="Work"
      title="Projects"
      titleAs="h1"
      description="Production software shipped across FinTech, education, e-commerce, and business management."
    >
      {projects.length > 0 ? (
        <ProjectsGrid projects={projects} />
      ) : (
        <EmptyState
          title="No projects published yet"
          description="Check back soon — projects are being added."
        />
      )}
    </Section>
  );
}
