export interface Experience {
  id: string;
  company: string;
  role: string;
  /** City/country or "Remote" — optional, shown only when known. */
  location?: string;
  startDate: string;
  endDate?: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  /** Maps to the career-growth story (CSE -> ... -> International Engineering). */
  milestoneStage: string;
}
