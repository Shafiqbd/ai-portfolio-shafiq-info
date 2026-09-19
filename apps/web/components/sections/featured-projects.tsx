import Link from "next/link";
import { Button } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { getFeaturedProjects } from "@/services/project.service";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();
  if (projects.length === 0) return null;

  return (
    <Section
      eyebrow="Selected work"
      title="Featured Projects"
      description="A closer look at the systems I've built end to end."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RevealGroup>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </RevealGroup>
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="secondary" size="lg">
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </Section>
  );
}
