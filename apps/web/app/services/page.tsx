import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, CardDescription, CardHeader, CardTitle, EmptyState } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { getServices } from "@/services/service.service";

export const metadata: Metadata = {
  title: "Services",
  description: "Custom software, ERP, AI integration, and full-stack development services.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <Section eyebrow="What I can build" title="Services">
      {services.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Card className="h-full transition-colors hover:border-accent">
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
        </div>
      ) : (
        <EmptyState title="No services listed yet" />
      )}
    </Section>
  );
}
