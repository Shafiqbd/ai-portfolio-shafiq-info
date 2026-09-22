export interface Article {
  slug: string;
  title: string;
  /** Short plain-text summary shown on cards and listings. */
  shortDescription: string;
  /** Full article body as an HTML string, rendered on the detail page. */
  content: string;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  coverImageUrl?: string;
}
