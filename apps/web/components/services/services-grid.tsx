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
            <Card className="flex h-full flex-col" onMouseMove={handleSpotlightMove}>
              <div className="spotlight-effect" aria-hidden="true" />
              <CardHeader>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <ServiceIcon icon={service.icon} />
                    <CardTitle>{service.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{service.shortDescription}</CardDescription>
              </CardHeader>
              <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-4">
                {service.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-gradient-brand text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-foreground-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </RevealGroup>
    </div>
  );
}
