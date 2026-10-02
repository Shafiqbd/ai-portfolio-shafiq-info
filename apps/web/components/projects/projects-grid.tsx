import type { Project } from "@shafiq-info/types";
import { RevealGroup } from "@/components/common/reveal";
import { ProjectCard } from "@/components/projects/project-card";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <RevealGroup>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} priority={index < 3} />
        ))}
      </RevealGroup>
    </div>
  );
}
