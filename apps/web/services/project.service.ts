import type { Project } from "@shafiq-info/types";
import projectsData from "@data/projects.json";

const projects = projectsData as Project[];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((project) => project.slug === slug);
}
