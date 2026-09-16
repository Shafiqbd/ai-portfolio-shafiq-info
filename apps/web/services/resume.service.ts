import type { ResumeVariant } from "@shafiq-info/types";
import resumeData from "@data/resume.json";

const resumeVariants = resumeData as ResumeVariant[];

export async function getResumeVariants(): Promise<ResumeVariant[]> {
  return resumeVariants;
}
