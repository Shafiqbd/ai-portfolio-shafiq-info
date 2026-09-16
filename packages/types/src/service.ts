export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  /** Present when this service is delivered through an affiliated brand (e.g. TechQul). */
  deliveredVia?: {
    name: string;
    url: string;
  };
  relatedProjectIds?: string[];
}
