export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  /** lucide-react icon name, e.g. "Code2". */
  icon?: string;
  /** Present when this service is delivered through an affiliated brand (e.g. TechQul). */
  deliveredVia?: {
    name: string;
    url: string;
  };
  relatedProjectIds?: string[];
  /** Optional showcase media for the featured/highlighted service slot. */
  media?: {
    type: "video" | "image";
    url: string;
  };
  tagline?: string;
}
