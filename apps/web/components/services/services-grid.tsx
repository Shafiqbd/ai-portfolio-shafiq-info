"use client";

import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@shafiq-info/ui";
import { RevealGroup } from "@/components/common/reveal";
import { ServiceIcon } from "@/components/common/service-icon";
import { handleSpotlightMove } from "@/lib/spotlight";
import type { Service } from "@shafiq-info/types";

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <RevealGroup>
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`}>
            <Card className="h-full" onMouseMove={handleSpotlightMove}>
              <div className="spotlight-effect" aria-hidden="true" />
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <ServiceIcon icon={service.icon} />
                    <CardTitle>{service.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{service.shortDescription}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </RevealGroup>
    </div>
  );
}
