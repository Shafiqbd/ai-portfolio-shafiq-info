"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@shafiq-info/types";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shafiq-info/ui";
import { RevealGroup } from "@/components/common/reveal";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const allTechnologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((project) => project.technologies.forEach((tech) => set.add(tech)));
    return Array.from(set).sort();
  }, [projects]);

  const filteredProjects = activeTech
    ? projects.filter((project) => project.technologies.includes(activeTech))
    : projects;

  return (
    <div className="flex flex-col gap-8">
      {allTechnologies.length > 1 && (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by technology"
        >
          <button
            type="button"
            onClick={() => setActiveTech(null)}
            aria-pressed={activeTech === null}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
              activeTech === null
                ? "border-transparent bg-gradient-brand text-white shadow-glow"
                : "border-border text-foreground-muted hover:text-foreground"
            }`}
          >
            All
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setActiveTech(tech)}
              aria-pressed={activeTech === tech}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
                activeTech === tech
                  ? "border-transparent bg-gradient-brand text-white shadow-glow"
                  : "border-border text-foreground-muted hover:text-foreground"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RevealGroup>
          {filteredProjects.map((project) => (
            <Card key={project.id} id={project.slug} className="flex h-full flex-col scroll-mt-24">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <p className="text-xs text-foreground-muted">{project.role}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex-wrap">
                {project.caseStudySlug && (
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/case-studies/${project.caseStudySlug}`}>Read case study</Link>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild variant="ghost" size="sm">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant="ghost" size="sm">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
