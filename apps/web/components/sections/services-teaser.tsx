import Link from "next/link";
import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getServices } from "@/services/service.service";

export async function ServicesTeaser() {
  const services = await getServices();
  if (services.length === 0) return null;

  return (
    <Section eyebrow="What I can build" title="Services">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RevealGroup>
          {services.slice(0, 6).map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>{service.title}</CardTitle>
                    {service.deliveredVia && (
                      <Badge variant="accent">via {service.deliveredVia.name}</Badge>
                    )}
                  </div>
                  <CardDescription>{service.summary}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
