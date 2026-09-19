import Link from "next/link";
import Image from "next/image";
import { Badge, Button } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { ServiceIcon } from "@/components/common/service-icon";
import { getServices } from "@/services/service.service";
import { ServiceCarousel } from "./service-carousel";
import type { Service } from "@shafiq-info/types";

function FeaturedServiceMedia({ service }: { service: Service }) {
  if (service.media?.type === "video") {
    return (
      <video
        src={service.media.url}
        autoPlay
        muted
        loop
        playsInline
        className="shadow-glow aspect-video w-full rounded-3xl object-cover"
      />
    );
  }

  if (service.media?.type === "image") {
    return (
      <div className="shadow-glow relative aspect-video w-full overflow-hidden rounded-3xl">
        <Image src={service.media.url} alt={service.title} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className="shadow-glow relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border border-transparent [background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand-soft)_border-box]">
      <div
        aria-hidden="true"
        className="bg-mesh animate-mesh-drift pointer-events-none absolute inset-0 opacity-60 blur-2xl"
      />
      <ServiceIcon
        icon={service.icon}
        className="relative h-20 w-20 rounded-2xl"
        iconClassName="h-10 w-10"
      />
    </div>
  );
}

export async function ServicesTeaser() {
  const services = await getServices();
  if (services.length === 0) return null;

  const [featured, ...rest] = services;

  return (
    <Section eyebrow="What I can build" title="Services">
      <div className="flex flex-col gap-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Badge variant="accent" className="w-fit">
              Featured
            </Badge>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{featured.title}</h3>
            <p className="text-foreground-muted text-justify">{featured.description}</p>
            {featured.deliveredVia && (
              <Badge variant="accent" className="w-fit">
                via {featured.deliveredVia.name}
              </Badge>
            )}
            <Button asChild className="w-fit">
              <Link href={`/services/${featured.slug}`}>Learn more</Link>
            </Button>
          </div>
          <FeaturedServiceMedia service={featured} />
        </div>

        {rest.length > 0 && <ServiceCarousel services={rest} />}
      </div>
    </Section>
  );
}
