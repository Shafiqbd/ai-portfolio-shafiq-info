import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Code2, Folder } from "lucide-react";
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
import type { Project } from "@shafiq-info/types";

export function ProjectCard({ project }: { project: Project }) {
  const primaryHref = project.liveUrl
    ? project.liveUrl
    : project.caseStudySlug
      ? `/case-studies/${project.caseStudySlug}`
      : `/projects#${project.slug}`;
  const primaryLabel = project.liveUrl
    ? "Live Demo"
    : project.caseStudySlug
      ? "Read case study"
      : "View details";

  return (
    <Card id={project.slug} sparkle className="flex h-full flex-col overflow-hidden scroll-mt-24">
      <div className="bg-background relative -mx-6 -mt-6 mb-4 aspect-video overflow-hidden">
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="bg-gradient-brand flex h-full items-center justify-center">
            <Folder className="h-12 w-12 text-white/90" aria-hidden="true" />
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </CardContent>

      <CardFooter className="flex-wrap">
        <Button asChild size="sm">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {primaryLabel}
            </a>
          ) : (
            <Link href={primaryHref}>{primaryLabel}</Link>
          )}
        </Button>
        {project.githubUrl && (
          <Button asChild variant="secondary" size="sm">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Code2 className="h-4 w-4" aria-hidden="true" />
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
