import { Section } from "@/components/common/section";
import { getGalleryItems } from "@/services/gallery.service";

const TILE_GRADIENTS = [
  "from-indigo-500 via-violet-500 to-fuchsia-500",
  "from-fuchsia-500 via-pink-500 to-rose-500",
  "from-blue-500 via-indigo-500 to-purple-500",
  "from-purple-500 via-fuchsia-500 to-pink-500",
  "from-cyan-500 via-blue-500 to-indigo-500",
];

export async function GalleryMarquee() {
  const items = await getGalleryItems();
  if (items.length === 0) return null;

  // Duplicated so the marquee can loop seamlessly (translateX(-50%)).
  const looped = [...items, ...items];

  return (
    <Section eyebrow="Focus areas" title="Gallery">
      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="animate-marquee flex w-max gap-5">
          {looped.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`flex h-40 w-64 shrink-0 flex-col justify-end overflow-hidden rounded-card bg-linear-to-br p-5 text-white shadow-glow ${
                TILE_GRADIENTS[index % TILE_GRADIENTS.length]
              }`}
            >
              <p className="font-mono text-xs uppercase tracking-wide text-white/70">
                {item.category}
              </p>
              <p className="text-lg font-semibold">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
