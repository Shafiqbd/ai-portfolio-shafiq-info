export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  role: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  thumbnailUrl: string;
  featured: boolean;
  /** Present when a deep-dive narrative exists at /case-studies/[slug]. */
  caseStudySlug?: string;
}
