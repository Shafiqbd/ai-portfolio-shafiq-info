import type { Certification, Education } from "@shafiq-info/types";
import educationData from "@data/education.json";
import certificationsData from "@data/certifications.json";

const education = educationData as Education[];
const certifications = certificationsData as Certification[];

export async function getEducation(): Promise<Education[]> {
  return education;
}

export async function getCertifications(): Promise<Certification[]> {
  return certifications;
}
