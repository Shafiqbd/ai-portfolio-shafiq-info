import Link from "next/link";
import { Badge, Button } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { getServices } from "@/services/service.service";
import { ServiceMedia } from "@/components/services/service-media";
import { ServiceCarousel } from "./service-carousel";

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
            <p className="text-foreground-muted text-justify">{featured.shortDescription}</p>
            {featured.tagline && (
              <p className="text-gradient-brand w-fit font-medium italic">
                &ldquo;{featured.tagline}&rdquo;
              </p>
            )}
            <Button asChild className="mt-2 w-fit">
              <Link href={`/services/${featured.slug}`}>Learn more</Link>
            </Button>
          </div>
          <ServiceMedia service={featured} />
        </div>

        {rest.length > 0 && <ServiceCarousel services={rest} />}
      </div>
    </Section>
  );
}
