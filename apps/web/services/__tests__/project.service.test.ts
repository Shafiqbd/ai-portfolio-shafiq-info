import { describe, expect, it } from "vitest";
import { getFeaturedProjects, getProjectBySlug, getProjects } from "../project.service";

describe("project.service", () => {
  it("returns all seeded projects", async () => {
    const projects = await getProjects();
    expect(projects.length).toBeGreaterThan(0);
  });

  it("filters to only featured projects", async () => {
    const featured = await getFeaturedProjects();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((project) => project.featured)).toBe(true);
  });

  it("looks up a project by slug", async () => {
    const project = await getProjectBySlug("smart-somity");
    expect(project?.title).toBe("Smart Somity");
  });

  it("returns undefined for a missing slug rather than throwing", async () => {
    const project = await getProjectBySlug("does-not-exist");
    expect(project).toBeUndefined();
  });
});
