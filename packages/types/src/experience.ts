export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  /** Maps to the career-growth story (CSE -> ... -> International Engineering). */
  milestoneStage: string;
}
