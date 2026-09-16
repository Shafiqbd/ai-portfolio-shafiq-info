export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  /** Path to the MDX source, relative to data/articles. */
  contentPath: string;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  coverImageUrl?: string;
}
