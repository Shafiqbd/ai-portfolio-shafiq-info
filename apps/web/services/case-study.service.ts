import type { CaseStudy } from "@shafiq-info/types";
import caseStudiesData from "@data/case-studies.json";

const caseStudies = caseStudiesData as CaseStudy[];

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return caseStudies;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
