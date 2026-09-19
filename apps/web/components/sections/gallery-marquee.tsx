import { Section } from "@/components/common/section";
import { getGalleryItems } from "@/services/gallery.service";
import { GalleryCarousel } from "./gallery-carousel";

export async function GalleryMarquee() {
  const items = await getGalleryItems();
  if (items.length === 0) return null;

  return (
    <Section eyebrow="Focus areas" title="Gallery">
      <GalleryCarousel items={items} />
    </Section>
  );
}
