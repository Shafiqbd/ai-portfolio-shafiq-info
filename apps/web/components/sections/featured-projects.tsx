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
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
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
          {projects.map((project) => {
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
              <Card key={project.id} sparkle className="flex h-full flex-col overflow-hidden">
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
          })}
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
