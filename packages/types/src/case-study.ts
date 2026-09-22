export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyHighlight {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** Short plain-text summary shown on cards and listings. */
  shortDescription: string;
  category: string;
  tags: string[];
  coverImageUrl?: string;
  /** Live system URL — "#" means not publicly reachable yet. */
  projectUrl?: string;
  role: string;
  projectType: string;
  duration: string;
  /** Body sections as HTML strings, rendered on the detail page. */
  overview: string;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  engineeringHighlights: CaseStudyHighlight[];
  techStack: string[];
  metrics: CaseStudyMetric[];
  learnings: string;
  nextSteps: string[];
}
