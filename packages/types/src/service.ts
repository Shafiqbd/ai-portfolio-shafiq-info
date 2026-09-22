export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  /** Full article body as an HTML string, rendered on the detail page. */
  content: string;
  /** lucide-react icon name, e.g. "Code2". */
  icon?: string;
  relatedProjectIds?: string[];
  /** Optional showcase media for the featured/highlighted service slot. */
  media?: {
    type: "video" | "image";
    url: string;
  };
  stats: {
    icon: string;
    value: string;
    label: string;
  }[]
  tagline?: string;
}
