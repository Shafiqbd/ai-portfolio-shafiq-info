import type { Metadata } from "next";
import { EmptyState } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { ServicesGrid } from "@/components/services/services-grid";
import { getServices } from "@/services/service.service";

export const metadata: Metadata = {
  title: "Services",
  description: "Custom software, ERP, AI integration, and full-stack development services.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <Section eyebrow="What I can build" title="Services" titleAs="h1">
      {services.length > 0 ? <ServicesGrid services={services} /> : <EmptyState title="No services listed yet" />}
    </Section>
  );
}
