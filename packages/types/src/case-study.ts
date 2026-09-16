export interface EngineeringDecision {
  decision: string;
  rationale: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  problem: string;
  context: string;
  requirements: string[];
  solution: string;
  architecture: {
    description: string;
    diagramUrl?: string;
  };
  technologies: string[];
  role: string;
  features: string[];
  challenges: string[];
  engineeringDecisions: EngineeringDecision[];
  impact?: string;
  screenshots: string[];
  liveUrl?: string;
  githubUrl?: string;
  relatedProjectIds: string[];
}
