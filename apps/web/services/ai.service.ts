import type { FaqEntry } from "@shafiq-info/types";
import faqData from "@data/faq.json";

const faqEntries = faqData as FaqEntry[];

/**
 * Phase 1: static keyword match against the FAQ knowledge base — never
 * hallucinates because it only ever returns pre-written, reviewed answers.
 * Phase 12 replaces this with the RAG pipeline (PostgreSQL + pgvector) behind
 * the same signature.
 */
export async function askShafiq(question: string): Promise<FaqEntry | undefined> {
  const normalized = question.trim().toLowerCase();
  if (!normalized) return undefined;

  const words = normalized.split(/\s+/).filter((word) => word.length > 3);

  let best: { entry: FaqEntry; score: number } | undefined;
  for (const entry of faqEntries) {
    const haystack = entry.question.toLowerCase();
    const score = words.filter((word) => haystack.includes(word)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best?.entry;
}

export async function getFaqEntries(): Promise<FaqEntry[]> {
  return faqEntries;
}
