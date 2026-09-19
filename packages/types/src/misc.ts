export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  // Optional: some entries are seeded before exact dates are confirmed.
  startYear?: number;
  endYear?: number;
  cgpa: string;
  outOf: string;
}

export interface Certification {
  name: string;
  issuer: string;
  // Optional: some entries are seeded before an exact issue date is confirmed.
  issuedDate?: string;
  credentialUrl?: string;
}

export interface Award {
  name: string;
  issuer: string;
  // Optional: some entries are seeded before an exact date is confirmed.
  issuedDate?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
  category?: string;
}

export type ResumeVariantId = "software-engineer" | "fullstack-remote" | "academic";

export interface ResumeVariant {
  id: ResumeVariantId;
  label: string;
  fileUrl: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
  sourceIds?: string[];
}
